import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allBooksSelector } from '../../reducers/books';
import AddBookCtA from '../ctas/AddBookCtA';

const DashboardPage = ({
  isConfirmed,
  books
}: {
  isConfirmed: boolean,
  books: []
}): Element<any> => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage />}

    {books.length === 0 && <AddBookCtA />}
  </div>
);

function mapStateToProps(state: {}): {} {
  return {
    isConfirmed: Boolean(state.user.confirmed),
    books: allBooksSelector(state)
  };
}

export default withRouter(connect(mapStateToProps)(DashboardPage));
