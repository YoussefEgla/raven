import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            <img src="/warbler-logo.png" alt="Raven" />
          </Link>
        </div>

        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/login">login in</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, null)(Navbar);
