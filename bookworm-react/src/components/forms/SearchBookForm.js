import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

export default class SearchBookForm extends Component {
  state = {
    query: '',
    loading: false,
    options: [],
    books: {}
  };

  onSearchChange = (e: {}, data: string) => {
    clearTimeout(this.timer);
    this.setState({ query: data });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChange = (e: {}, { value }: { value: string }) => {
    this.setState({ query: value });
    this.props.onBookSelect(this.state.books[value]);
  };

  fetchOptions = () => {
    const { setState, state: { query } } = this;
    if (!query) return;
    setState({ loading: true });
    axios
      .get(`/api/books/search?q=${query}`)
      .then((res: {}): [] => res.data.books)
      .then((books: []) => {
        const options = [];
        const booksHash = {};
        books.forEach((book: {}) => {
          const { goodreadsId, title } = book;
          booksHash[goodreadsId] = book;
          options.push({
            key: goodreadsId,
            value: goodreadsId,
            text: title
          });
        });
        this.setState({ loading: false, options, books: booksHash });
      });
  };

  render(): Element<any> {
    const {
      onSearchChange,
      onChange,
      state: { query, options, loading }
    } = this;
    
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for book by title"
          value={query}
          onSearchChange={onSearchChange}
          options={options}
          loading={loading}
          onChange={onChange}
        />
      </Form>
    );
  }
}
