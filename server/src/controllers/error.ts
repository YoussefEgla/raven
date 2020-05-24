import { Request, Response, NextFunction } from "express";
import { Errors } from "../middleware/";

/**
 *
 * Errors controller is responsible for handling
 * errors that occur while processing data and
 * send informative response to client while
 * providing real error cause for logging
 *
 */
export const errorsController = (
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
