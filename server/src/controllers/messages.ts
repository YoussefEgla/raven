import { Message, Account } from "../models";
import { Request, Response, NextFunction } from "express";

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundUser = await Account.findById(req.params.id);
    if (foundUser === null) throw "User Doesn't exist";
    const message = await Message.create({
      text: req.body.text,
      account: req.params.id,
    });
    foundUser.messages.push(message.id);
    foundUser.save();

    const foundMessage = await Message.findById(message.id).populate(
      "Accounts",
      {
        username: true,
      }
    );
    return res.status(201).json(foundMessage).end();
  } catch (err) {
    next(err);
  }
};
