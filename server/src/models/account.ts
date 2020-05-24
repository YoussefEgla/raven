import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { HookNextFunction } from "mongoose";

@pre<Account>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    return next(err);
  }
})
class Account {
  @prop({ required: true, unique: true })
  username!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop()
  profileImageUrl?: string;

  async comparePassword(candidatePassword: string, next: HookNextFunction) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (err) {
      return next(err);
    }
  }
}

export default getModelForClass(Account);
