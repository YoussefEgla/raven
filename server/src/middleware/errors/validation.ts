import { ValidationError } from "express-validator";
import { BaseError } from "./";

export class RequestValidationError extends BaseError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((err: ValidationError) => {
      return { message: err.msg, field: err.param };
    });
  }
}
