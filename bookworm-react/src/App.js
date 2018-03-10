import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import NewBookPage from './components/pages/NewBookPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';

const App = ({
  isAuthenticated
}: {
  isAuthenticated: boolean
}): Element<any> => (
  <div className="ui container">
    {isAuthenticated && <TopNavigation />}
    <Route path="/" exact component={HomePage} />
    <Route path="/confirmation/:token" exact component={ConfirmationPage} />
    <GuestRoute path="/login" exact component={LoginPage} />
    <GuestRoute path="/signup" exact component={SignupPage} />
    <GuestRoute
      path="/forgot_password/:token"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute path="/reset_password" exact component={ResetPasswordPage} />
    <UserRoute path="/dashboard" exact component={DashboardPage} />
    <UserRoute path="/books/new" exact component={NewBookPage} />
  </div>
);

function mapStateToProps(state: {}): {} {
  return {
    isAuthenticated: Boolean(state.user.email)
  };
}

export default connect(mapStateToProps)(App);
