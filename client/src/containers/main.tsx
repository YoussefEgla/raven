import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";

const Main = (props: any) => {
  return (
    <div className="container">
      <switch>
        <Route
          exact
          path="/"
          render={(props) => {
            //@ts-ignore
            return <Homepage {...props} />;
          }}
        />
      </switch>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    currentUser: state.currentUser,
  };
};

export default withRouter(connect(mapStateToProps, null)(Main));
