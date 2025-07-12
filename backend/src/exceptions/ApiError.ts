export class ApiError extends Error {
  status: number;
  errors: Record<string, string | null>;

  constructor(status: number, message: string, errors: Record<string, string | null> = {}) {
    super(message);
    this.status = status;
    this.errors = errors;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static BadRequest(message: string, errors: Record<string, string | null> = {}) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message = 'Not found') {
    return new ApiError(404, message);
  }
}
