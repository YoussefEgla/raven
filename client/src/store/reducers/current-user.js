import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false, // will be true when a user is logged in
  user: {}, // alll the user information when they are logged in
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: Object.keys(action.user).length > 0,
        user: action.user,
      };
    default:
      return state;
  }
};
