import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";

const Main = () => {
  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            //@ts-ignore
            return <Homepage {...props} />;
          }}
        />
        <Route
          exact
          path="/login"
          render={(props) => {
            //@ts-ignore
            return <AuthForm text="Login" heading="Welcome Back!" {...props} />;
          }}
        />
        <Route
          exact
          path="/signup"
          render={(props) => {
            //@ts-ignore
            return <AuthForm text="Sign up" heading="Join Raven!" {...props} />;
          }}
        />
      </Switch>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    currentUser: state.currentUser,
  };
};

export default withRouter(connect(mapStateToProps, null)(Main));
