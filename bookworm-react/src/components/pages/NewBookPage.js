import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';
import { createBook } from '../../actions/books';

class NewBookPage extends Component<{
  createBook: {},
  history: {}
}> {
  state = {
    book: null
  };

  onBookSelect = (book: {}) => {
    this.setState({ book });
    axios
      .get(`/api/books/fetchPages?goodreadsId=${book.goodreadsId}`)
      .then((res: {}): number => res.data.pages)
      .then((pages: number) => {
        this.setState({ book: { ...book, pages } });
      });
  };

  addBook = (book: {}) => {
    const { props: { createBook, history: { push } } } = this;

    createBook(book).then(() => {
      push('/dashboard');
    });
  };

  render(): Element<any> {
    return (
      <Segment>
        <h1>Add a new book to your collection</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />

        {this.state.book && <BookForm submit={this.addBook} book={this.state.book} />}
      </Segment>
    );
  }
}

export default withRouter(connect(null, { createBook })(NewBookPage));
