import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = (): Element<any> => (
  <div className="ui container">
    <Route path="/" exact component={HomePage} />
    <GuestRoute path="/login" exact component={LoginPage} />
    <GuestRoute path="/signup" exact component={SignupPage} />
    <UserRoute path="/dashboard" exact component={DashboardPage} />
  </div>
);
export default App;
