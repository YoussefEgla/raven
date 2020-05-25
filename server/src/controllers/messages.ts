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

export const getMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await Message.findById(req.params.message_id);
    if (message === null) {
      res.status(404);
      return next(new Error("Message doesn't exist"));
    }

    res.status(200).json(message);
    next();
  } catch (err) {
    return next(err);
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await Message.findById(req.params.message_id);
    if (message === null) {
      res.status(404);
      return next(new Error("Message doesn't exist"));
    }
    message.remove();
    res.status(200).json(message);
    next();
  } catch (err) {
    return next(err);
  }
};
