import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashboardPage = ({
  isConfirmed
}: {
  isConfirmed: boolean
}): Element<any> => <div>{!isConfirmed && <ConfirmEmailMessage />}</div>;

function mapStateToProps(state: {}): {} {
  return {
    isConfirmed: Boolean(state.user.confirmed)
  };
}

export default withRouter(connect(mapStateToProps)(DashboardPage));
