import React, { Component } from 'react';
import { Form, Segment, Grid, Button, Image } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

export default class BookForm extends Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages
    },
    covers: this.props.book.covers,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps: {}) {
    this.setState({
      data: {
        goodreadsId: nextProps.book.goodreadsId,
        title: nextProps.book.title,
        authors: nextProps.book.authors,
        cover: nextProps.book.covers[0],
        pages: nextProps.book.pages
      },
      covers: nextProps.book.covers,
      index: 0
    });
  }

  onChange = ({ target: { name, value } }: { name: string, value: string }) => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [name]: value }
    });
  };

  onChangeNumber = ({
    target: { name, value }
  }: {
    name: string,
    value: string
  }) => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [name]: Number(value) }
    });
  };

  onSubmit = (e: {}) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch((err: {}): {} =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  changeCover = () => {
    const { index, covers, data } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: { ...data, cover: covers[newIndex] }
    });
  };

  validate = ({
    title,
    authors,
    pages
  }: {
    title: string,
    authors: string,
    pages: number
  }) => {
    const errors = {};
    if (!title) errors.title = "Can't be blank";
    if (!authors) errors.authors = "Can't be blank";
    if (!pages) errors.pages = "Can't be blank";
  };

  render(): Element<any> {
    const {
      onSubmit,
      changeCover,
      onChange,
      onChangeNumber,
      state: { errors, data, loading, covers }
    } = this;

    const { title, authors, pages, cover } = data;

    return (
      <Segment>
        <Form onSubmit={onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={Boolean(errors.title)}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="title"
                    value={title}
                    onChange={onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>
                <Form.Field error={Boolean(errors.authors)}>
                  <label htmlFor="authors">Book Authors</label>
                  <input
                    type="text"
                    name="authors"
                    id="authors"
                    placeholder="Authors"
                    value={authors}
                    onChange={onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>
                <Form.Field error={Boolean(errors.pages)}>
                  <label htmlFor="pages">Pages</label>
                  <input
                    disabled={pages === undefined}
                    type="text"
                    name="pages"
                    id="pages"
                    placeholder="pages"
                    value={pages !== undefined ? pages : 'Loading...'}
                    onChange={onChangeNumber}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image size="small" src={cover} />
                {covers.length > 1 && (
                  <a role="button" tabIndex="0" onClick={changeCover}>
                    Another cover
                  </a>
                )}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}
