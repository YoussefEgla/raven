const db = require("../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.singin = async (req, res, next) => {
  try {
    // find a user
    let user = await db.User.findOne({ email: req.body.email });

    // @ts-ignore
    let { id, username, profileImageUrl } = user;

    // @ts-ignore
    let isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      let token = jwt.sign(
        { id, username, profileImageUrl },
        process.env.SECRET_KEY
      );
      return res.status(200).json({ id, username, profileImageUrl, token });
    } else {
      next({
        status: 400,
        message: "invalid email or password",
      });
    }
  } catch (err) {
    next({
      status: 400,
      message: "invalid email or password",
    });
  }
};

exports.singup = async (req, res, next) => {
  try {
    // @ts-ignore
    let user = await db.User.create(req.body);
    // @ts-ignore
    let { id, username, profileImageUrl } = user;

    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl,
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({ id, username, profileImageUrl, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username / email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
