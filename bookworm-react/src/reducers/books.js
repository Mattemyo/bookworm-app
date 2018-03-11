import { createSelector } from 'reselect';
import { BOOKS_FETCHED, BOOK_CREATED } from '../types';

export default (
  state: {} = {},
  { type, data: { entities: { books } } }: { books: {} } = {}
): {} => {
  switch (type) {
    case BOOKS_FETCHED:
    case BOOK_CREATED:
      return {
        ...state,
        ...books
      };
    default:
      return state;
  }
};

// SELECTORS
export const booksSelector = (state: {}): [] => state.books;

export const allBooksSelector = createSelector(booksSelector, (booksHash: {}): array =>
  Object.values(booksHash)
);
