import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialiseErrors(): { message: string; field: string | number }[] {
    return [{ message: this.message, field: "badRequest" }];
  }
}
