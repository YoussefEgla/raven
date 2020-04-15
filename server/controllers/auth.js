const db = require("../models/");
const jwt = require("jsonwebtoken");

exports.singin = (req, res, next) => {};

exports.singup = async (req, res, next) => {
  try {
    // @ts-ignore
    let user = await db.User.create(req.body);
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
