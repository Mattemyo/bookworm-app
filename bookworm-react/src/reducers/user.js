import { USER_LOGGED_IN } from '../types';

export default (state: {} = {}, action: {} = {}): {} => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
};
