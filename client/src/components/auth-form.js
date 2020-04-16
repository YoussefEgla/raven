import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      profileImageUrl: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state).then(() => {
      console.log("Loggedin");
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const { heading, buttonText, signUp } = this.props;
    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>

              {signUp && (
                <div>
                  <label htmlFor="username">Username: </label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    type="username"
                    onChange={this.handleChange}
                    value={username}
                  />
                  <label htmlFor="email">Email: </label>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                    value={email}
                  />
                  <label htmlFor="password">Password: </label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={password}
                  />
                </div>
              )}
              <button className="btn btn-primary btn-block btn-lg">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;