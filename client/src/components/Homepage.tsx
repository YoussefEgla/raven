import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="home-hero">
      <h1>What's happening?</h1>
      <h4>New to warbler?</h4>
      <Link to="signup" className="btn btn-primary">
        Sign up
      </Link>
    </div>
  );
};
