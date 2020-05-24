import { BaseError } from "./base-error";

export class Error404 extends BaseError {
  statusCode = 404;

  constructor() {
    super("404 - URL not found");
    Object.setPrototypeOf(this, Error404.prototype);
  }

  serializeError() {
    return [{ message: "404 - URL not found" }];
  }
}
