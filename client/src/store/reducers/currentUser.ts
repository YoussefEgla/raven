import { SET_CURRENT_USER } from "../actionTypes";

interface USER_ACTIONS {
  type: string;
  payload: any;
}

const DEFAULT_STATE = {
  isAuthenticated: false, // true when logged in
  user: {}, // all user information when logged in
};

export default (state = DEFAULT_STATE, action: USER_ACTIONS) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: Object.keys(action.payload).length > 0,
        user: action.payload,
      };
    default:
      return state;
  }
};
