import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users';

class SignupPage extends Component<Props, State> {
  submit = (data: {}) => {
    this.props.signup(data).then(() => {
      this.props.history.push('/dashboard');
    });
  };

  render(): Element<any> {
    return (
      <div>
        <h1>Signup Page</h1>

        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

export default withRouter(connect(null, { signup })(SignupPage));
