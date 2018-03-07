import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const HomePage = ({
  isAuthenticated,
  logout
}: {
  isAuthenticated: boolean,
  logout: {}
}): Element<any> => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? (
      <button onClick={(): any => logout()}>Logout</button>
    ) : (
      <Link to="/login">Login</Link>
    )}
  </div>
);

function mapStateToProps(state: {}): {} {
  return {
    isAuthenticated: Boolean(state.user.token)
  };
}
export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
