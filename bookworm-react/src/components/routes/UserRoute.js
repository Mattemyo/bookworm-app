import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: {
  isAuthenticated: boolean,
  component: {}
}): Element<any> => (
  <Route
    {...rest}
    render={(props: {}): Element<any> =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

function mapStateToProps(user: { token: string }): {} {
  return {
    isAuthenticated: Boolean(token)
  };
}

export default connect(mapStateToProps)(UserRoute);
