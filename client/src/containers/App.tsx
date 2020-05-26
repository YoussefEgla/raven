import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>Hello world</div>
      </BrowserRouter>
    </Provider>
  );
};
