import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends Component<Props, State> {
  submit = (data: {}) => {
    this.props
      .login(data)
      .then((): void => this.props.history.push('/dashboard'));
  };

  render(): Element<any> {
    return (
      <div>
        <h1>Login Page</h1>

        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot Password?</Link>
      </div>
    );
  }
}

export default withRouter(connect(null, { login })(LoginPage));
