import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/homepage";
import AuthForm from "../components/auth-form";
import { authUser } from "../store/actions/auth";

function Main(props) {
  const { authUser } = props;
  return (
    <div className="Main">
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
        <Route
          exact
          path="/signin"
          render={(props) => {
            return (
              <AuthForm
                onAuth={authUser}
                buttonText="login"
                heading="Welcome back"
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={(props) => {
            return (
              <AuthForm
                onAuth={authUser}
                signUp
                buttonText="sign up"
                heading="Join Raven"
                {...props}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default withRouter(connect(mapStateToProps, { authUser })(Main));
