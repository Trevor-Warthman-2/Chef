import HttpError from './httpError';

class InvalidRequestError extends HttpError {
  public constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default InvalidRequestError;

