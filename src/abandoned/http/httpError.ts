// A reference I found later for tips: https://github.com/tlaanemaa/http-error-classes/blob/main/src/errors/HttpError.ts
// I abandoned this to just use that actually
abstract class HttpError extends Error {
  public readonly statusCode: number;

  public message: string;

  public constructor(message: string): HttpError {
    this.message = message;
  }
}

export default HttpError;
