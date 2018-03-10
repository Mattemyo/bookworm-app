import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

export default class ResetPasswordForm extends Component<Props> {
  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: ''
    },
    loading: false,
    errors: {
      global: '',
      password: '',
      email: ''
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

  validate = (data: {}): any => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.password.passwordConfirmation)
      errors.password = 'Passwords must match';
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
        <Form.Field error={Boolean(errors.password)}>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="new password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={Boolean(errors.password)}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="secure"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={Boolean(errors.passwordConfirmation)}>
          <label htmlFor="passwordConfirmation">Confirm new password</label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="again, please"
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}
