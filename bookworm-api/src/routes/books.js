import express from 'express';
import request from 'request-promise';
import { parseString } from 'xml2js';
import authenticate from '../middlewares/authenticate';
import Book from '../models/Book';
import parseErrors from '../utils/parseErrors';

const { router: { get, use, post } } = express.Router();

use(authenticate);

get(
  '/',
  ({ currentUser: { _id } }: { _id: string }, { json }: { json: {} }) => {
    Book.find({ _id }).then((books: {}) => {
      json({ books });
    });
  }
);

post(
  '/',
  (
    { body: { book }, currentUser: { _id } }: { book: {}, _id: string },
    { json, status }: { json: {}, status: {} }
  ) => {
    Book.create({ ...book, userId: _id })
      .then((newBook: {}) => {
        json({ book: newBook });
      })
      .catch((err: {}) => {
        status(400).json({ errors: parseErrors(err.errors) });
      });
  }
);

get('/search', ({ query: { q } }: { q: string }, { json }: { json: {} }) => {
  request
    .get(
      `https://www.goodreads.com/search/index.xml?key=${
        process.env.GOODREADS_KEY
      }q=${q}`
    )
    .then((result: string) => {
      parseString(result, (err: {}, goodReadsResult: {}) => {
        json({
          books: goodReadsResult.GoodreadsResponse.search[0].results[0].work.map(
            ({
              best_book: { id, title, author, image_url }
            }: {
              id: [],
              title: [],
              author: [],
              image_url: []
            }): {} => ({
              goodreadsId: id[0]._,
              title: title[0],
              authors: author[0].name[0],
              covers: [image_url[0]]
            })
          )
        });
      });
    });
});

get(
  '/fetchPages',
  ({ query: { goodreadsId } }: { id: number }, { json }: { json: {} }) => {
    request
      .get(
        `https://www.goodreads.com/book/show.xml?key=${
          process.env.GOODREADS_KEY
        }id=${goodreadsId}`
      )
      .then((result: string) => {
        parseString(
          result,
          (
            err: {},
            { GoodreadsResponse: { book: [num_pages] } }: { num_pages: [] }
          ) => {
            json({
              pages: Number(num_pages[0])
            });
          }
        );
      });
  }
);
