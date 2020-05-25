import { prop, getModelForClass, mongoose, pre } from "@typegoose/typegoose";
import { Account } from "./";

@pre<Message>("remove", async function (next) {
  try {
    // find a user
    const user = await Account.findById(this.account);
    if (user === null) throw "User not found";
    // remove the id of the message from their messages list
    user.messages = user.messages?.filter((msgId) => {
      return msgId !== this._id;
    });
    // save that user
    user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
})
class Message {
  @prop({ required: true, maxlength: 160 })
  text!: string;

  @prop()
  profileImageUrl?: string;

  @prop({ ref: "Accounts" })
  account!: mongoose.Schema.Types.ObjectId;
}

export default getModelForClass(Message, {
  schemaOptions: {
    collection: "Messages",
    timestamps: true,
  },
});
