import React from "react";
import { Link } from "react-router-dom";

function Homepage(props) {
  return (
    <div className="home-hero">
      <h1>What's up!</h1>
      <h4>New to Raven?</h4>
      <Link to="/signup" className="btn btn-primary">
        Sign up here
      </Link>
    </div>
  );
}

export default Homepage;
