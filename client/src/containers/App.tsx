import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./navbar";
import Main from "./main";

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="onboarding">
          <Navbar />
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
};
