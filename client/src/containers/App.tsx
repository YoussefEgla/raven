import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./navbar";

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="onboarding">
          <Navbar />
        </div>
      </BrowserRouter>
    </Provider>
  );
};
