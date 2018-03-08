import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashBoardPage = ({
  isConfirmed
}: {
  isConfirmed: boolean
}): Element<any> => <div>{!isConfirmed && <ConfirmEmailMessage />}</div>;

function mapStateToProps(state: {}): {} {
  return {
    isConfirmed: Boolean(state.user.confirmed)
  };
}

export default withRouer(connect(mapStateToProps)(DashboardPage));
