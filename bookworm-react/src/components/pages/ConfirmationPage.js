import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component<Props> {
  state = {
    loading: true,
    success: false
  };

  componentDidMount = () => {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch(() => {
        this.setState({ loading: false, success: false });
      });
  };

  render(): Element<any> {
    const { loading, success } = this.state;

    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}
        {!loading &&
          success && (
            <Message success icon>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>
                  Thank you. Your account has been verified.
                </Message.Header>
                <Link to="dashboard">Go to your dashboard</Link>
              </Message.Content>
            </Message>
          )}
        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Header>Oops. Invalid token or something</Message.Header>
            </Message>
          )}
      </div>
    );
  }
}

export default withRouter(connect(null, { confirm })(ConfirmationPage));
