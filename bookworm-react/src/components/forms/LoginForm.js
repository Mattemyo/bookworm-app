  /*eslint no-undef: "error"*/
import React, { Component, SyntheticEvent } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../message/InlineError';

export default class LoginForm extends Component<Props> {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };


  onChange = ({ target }: {}) => {
    this.setState({
      data: { ...this.state.data, [target.name]: target.value }
    });
  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = (data: {}): {} => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  
    render(): ?React$Element<any> {
    const { data: { email, password }, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={Boolean(errors.email)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            value={email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email}/>}
        </Form.Field>
        <Form.Field error={Boolean(errors.password)}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="secure"
            value={password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password}/>}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}
