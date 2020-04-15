require("dotenv").config();
const jwt = require("jsonwebtoken");

// make sure the user is logged in - authentication
exports.loginRequired = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
      if (payload) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please login first",
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please login first",
    });
  }
};
// make sure we get the correct user - authorization
exports.ensureCorrectUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
      if (payload && payload.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "unauthorized",
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "unauthorized",
    });
  }
};
