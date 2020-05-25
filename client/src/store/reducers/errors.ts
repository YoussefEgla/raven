import { ERROR_TYPES as TYPES } from "../actionTypes";

interface ERROR_ACTION {
  type: TYPES;
  payload: string;
}

export default (state = { message: null }, action: ERROR_ACTION) => {
  switch (action.type) {
    case TYPES.ADD_ERROR:
      return { ...state, message: action.payload };
    case TYPES.REMOVE_ERROR:
      return { ...state, message: null };
    default:
      return state;
  }
};
