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
    console.log("executing");
    return res.status(201).json({ id, username, email, token }).end();
  } catch (err) {
    if (err.code === 11000) {
      console.log(err);
      return next(new Error("Duplicate key error"));
    } else {
      console.log(err);
      return next(err);
    }
  }
};
