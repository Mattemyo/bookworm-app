import express from 'express';
import request from 'request-promise';
import { parseString } from 'xml2js';
import authenticate from '../middlewares/authenticate';

const { router: { use, get } } = express.Router();

use(authenticate);

get('/search', ({ query: { q } }: { q: string }, { json }: { json: {} }) => {
  request
    .get(
      `https://www.goodreads.com/search/index.xml?key${GoodReadsAPIKey}q=${q}`
    )
    .then((result) => {
      parseString(result, (err, goodReadsResult) => {
        json({
          books: goodReadsResult.GoodreadsResponse.search[0].results[0].work.map(
            ({best_book:{id, title, author, image_url}}) => ({
              goodreadsId: id[0]._,
              title: title[0],
              authors: author[0].name[0],
              covers: [image_url[0]]
            }))
          })
        })
      });
  }

