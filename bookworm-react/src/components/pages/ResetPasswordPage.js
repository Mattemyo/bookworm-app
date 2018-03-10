import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Message } from 'semantic-ui-react';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { validateToken, ResetPassword } from '../../actions/auth';

class ResetPasswordPage extends Component<State, Props> {
  state = {
    loading: true,
    success: false
  };
  componentDidMount = () => {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => {
        this.setState((loading: false), (success: true));
      })
      .catch(() => {
        this.setState((loading: false), (success: false));
      });
  };

  submit = (data) => {
    this.ResetPassword(data).then(() => {
      this.props.history.push('/login');
    });
  };

  render(): Element<any> {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;
    return (
      <div>
        {loading && <Message>Loading</Message>}
        {!loading &&
          success && <ResetPasswordForm submit={this.submit} token={token} />}
        {!loading && !success && <Message>Invalid Token</Message>}
      </div>
    );
  }
}

export default withRouter(connect(null, { validateToken })(ResetPasswordPage));
