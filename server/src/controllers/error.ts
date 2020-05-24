import { Request, Response, NextFunction } from "express";
import { Errors } from "../middleware/";

export const errorController = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Errors.BaseError) {
    return res
      .status(err.statusCode)
      .json({ errors: err.serializeError() })
      .end();
  } else {
    return res
      .status(400)
      .json({ errors: [{ message: err.message }] })
      .end();
  }
};
