import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest } from '../../actions/auth';

class ForgotPasswordPage extends Component {
  state = {
    success: false
  };

  submit = (data: {}) => {
    this.props.resetPasswordRequest(data).then(() => {
      this.setState({ success: true });
    });
  };

  render(): Element<any> {
    return (
      <div>
        {this.state.success ? (
          <Message>Email has been sent.</Message>
        ) : (
          <ForgotPasswordForm submit={this.submit} />
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(null, { resetPasswordRequest })(ForgotPasswordPage)
);
