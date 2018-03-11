import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allBooksSelector } from '../../reducers/books';
import AddBookCtA from '../ctas/AddBookCtA';
import { fetchBooks } from '../../actions/books';

class DashboardPage extends Component<{
  isConfirmed: boolean,
  books: [],
  fetchBooks: {}
}> {
  state = {};

  componentDidMount = () => {
    this.onInit(this.props);
  };

  onInit = ({ fetchBooks }: {}) => {};

  render(): Element<any> {
    const { props: { isConfirmed, books } } = this;

    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {books.length === 0 ? <AddBookCtA /> : <p>You have books!</p>}
      </div>
    );
  }
}

function mapStateToProps(state: {}): {} {
  return {
    isConfirmed: Boolean(state.user.confirmed),
    books: allBooksSelector(state)
  };
}

export default withRouter(connect(mapStateToProps, { fetchBooks })(DashboardPage));
