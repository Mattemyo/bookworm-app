import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

export default class LoginForm extends Component<Props> {
  state = {
    data: {
      email: ''
    },
    loading: false,
    errors: {
      global: '',
      password: ''
    }
  };

  onChange = ({ target }: {}) => {
    this.setState({
      data: { ...this.state.data, [target.name]: target.value }
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

  validate = (data: {}): {} => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    return errors;
  };

  render(): Element<any> {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={Boolean(errors.email)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button primary>Send new password</Button>
      </Form>
    );
  }
}
