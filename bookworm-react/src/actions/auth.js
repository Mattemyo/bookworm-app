import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api';

export const userLoggedIn = (user: {}): {} => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = (): {} => ({
  type: USER_LOGGED_OUT
});

export const login = (credentials: {}): any => (dispatch: {}): any =>
  api.user.login(credentials).then((user: {}): any => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const logout = (credentials: {}): any => (dispatch: {}): any => {
  localStorage.removeItem = 'bookwormJWT';
  dispatch(userLoggedOut());
};

export const confirm = (token:string): {} => (dispatch:) => {
  api.user.confirm(token).then((user) => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });
};
