import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason: string = 'Error connecting to database';
  constructor() {
    super('Error connecting to database');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serialiseErrors() {
    return [{ message: this.reason, field: 'database' }];
  }
}
