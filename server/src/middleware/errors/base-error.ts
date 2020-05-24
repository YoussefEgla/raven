/**
 *
 * Every business logic / application related error should
 * extend and implement BaseError for a uniform
 * response structure to the front end.
 *
 */
export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super();
    Object.setPrototypeOf(this, BaseError.prototype);
  }
  abstract serializeError(): { message: string; field?: string }[];
}
