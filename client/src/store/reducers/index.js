import { combineReducers } from "redux";
import currentUser from "./current-user";
import errors from "./error";

const rootReducer = combineReducers({
  currentUser,
  errors,
});

export default rootReducer;
