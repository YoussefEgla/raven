//@ts-nocheck
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export function configureStore() {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      (window as ReduxDevTools).__REDUX_DEVTOOLS_EXTENSION
        ? (window as ReduxDevTools).__REDUX_DEVTOOLS_EXTENSION()
        : (f: any) => f
    )
  );
}
