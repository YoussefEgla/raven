import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export function configureStore() {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      // @ts-ignore
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );
}
