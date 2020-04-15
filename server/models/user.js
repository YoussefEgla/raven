const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
});

// @ts-ignore
User.pre("save", async function (next) {
  try {
    // @ts-ignore
    if (!this.isModified()) {
      return next();
    }
    // @ts-ignore
    let hashedPassword = await bcrypt.hash(this.password, 10);
    // @ts-ignore
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// @ts-ignore
User.method.comparePassword = async (candidatePassword, next) => {
  try {
    // @ts-ignore
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model("User", User);
