import { ZodIssue } from 'zod';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ZodIssue[]) {
    super('Invalid request fields');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialiseErrors() {
    return this.errors.map((err) => {
      return {
        message: err.message,
        field: err.path[0],
      };
    });
  }
}
