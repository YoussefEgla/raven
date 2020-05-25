//@ts-nocheck
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Errors } from "../middleware/";
import { Account } from "../models";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Errors.RequestValidationError(errors.array()));
    }
    const user = await Account.create(req.body);
    const { email, id, username } = user;
    const token = jwt.sign({ id, username, email }, SECRET_KEY);
    return res.status(201).json({ id, username, email, token }).end();
  } catch (err) {
    if (err.code === 11000) {
      return next(new Error(err));
    } else {
      return next(err);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // finding a user
    const { email } = req.body;
    const user = await Account.findOne({ email });
    console.log(user);
    if (user === null) {
      return res.status(404).json({ errors: "user not found" });
    }

    // check if password matches
    let isMatch = await user?.comparePassword(req.body.password, next);
    if (!isMatch) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, username, email } = user;
    let token = jwt.sign({ id, username, email }, SECRET_KEY);

    // if password matches log them in
    res.status(202).json({ id, username, email, token });
  } catch (err) {
    // handle errors
    next(err);
  }
};
