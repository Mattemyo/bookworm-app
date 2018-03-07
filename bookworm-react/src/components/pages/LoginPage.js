import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';


class LoginPage extends Component<{ history: {} }, State> {
  submit = (data: {}) =>
    this.props.login(data).then(() => this.props.history.push('/'));

  render(): Element<any> {
    return (
      <div>
        <h1>Login Page</h1>

        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { login })(LoginPage);
