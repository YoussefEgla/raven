import React, { useState } from "react";

export default (props: any) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authType = props.text === "Login" ? "login" : "signup";
    //@ts-ignore
    props
      .onAuth(authType, values)
      .then(() => console.log("Resolved"))
      .catch((err: any) => console.log("Rejected"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="row justify-content-md-center text-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h2>{props.heading}</h2>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Email"
              />
            </div>
            {props.text === "Login" ? null : (
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                  placeholder="Username"
                />
              </div>
            )}

            <div className="form-group">
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Password"
              />
            </div>
            <input
              type="submit"
              value={props.text}
              className="btn btn-primary"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
