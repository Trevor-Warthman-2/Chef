import HttpError from './httpError';

class ServerError extends HttpError {
  public constructor(message: string) {
    super(message);
    this.statusCode = 500;
  }
}

export default ServerError;
