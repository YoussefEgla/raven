require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;

// make sure the sure is logged in - Authentication middleware
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (typeof token === "undefined") {
      res.status(401);
      return next(new Error("You are not logged in"));
    }

    jwt.verify(token, SECRET_KEY, function (err, payload) {
      if (payload) {
        return next();
      } else {
        res.status(401);
        return next(new Error("You are not authorized"));
      }
    });
  } catch (err) {
    next(err);
  }
};

// make sure we get the correct user - Authorization middleware
export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (typeof token === "undefined") {
      res.status(401);
      return next(new Error("You are not logged in"));
    }
    jwt.verify(token, SECRET_KEY, function (err, payload) {
      // @ts-ignore
      if (payload && payload.id === req.params.id) {
        return next();
      } else {
        res.status(401);
        return next(new Error("You are not authorized"));
      }
    });
  } catch (err) {
    return next(err);
  }
};
