import HttpError from './httpError';

class NotFoundError extends HttpError {
  public constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;

