import { CustomError } from './custom-error';

export class NotAuthorisedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super('Not authorised');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorisedError.prototype);
  }

  serialiseErrors(): { message: string; field: string | number }[] {
    return [
      {
        message: 'Not authorised',
        field: 'NotAuthorised',
      },
    ];
  }
}
