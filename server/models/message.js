const mongoose = require("mongoose");
const User = require("./user");

const Message = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 160,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

Message.pre("remove", async function (next) {
  try {
    // find a user
    // remove the id of the message from their messages list
    // save that user and return next
    // @ts-ignore
    const user = await User.findById(this.user);
    // @ts-ignore
    user.message.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Message", Message);
