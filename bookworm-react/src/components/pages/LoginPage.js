import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';

export default class LoginPage extends Component {
  submit = (data: {}) => {
    console.log(data);
  };
  render(): ?React$Element<any> {
    return (
      <div>
        <h1>Login Page</h1>

        <LoginForm submit={this.submit} />
      </div>
    );
  }
}
