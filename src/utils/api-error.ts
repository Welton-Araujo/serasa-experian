import { StatusCodes } from 'http-status-codes';

export default class ApiError extends Error {
  statusCode: number;
  errors?: any[];

  constructor(statusCode: number, message: string, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static badRequest(message: string, errors?: any[]) {
    return new ApiError(StatusCodes.BAD_REQUEST, message, errors);
  }

  static unauthorized(message: string) {
    return new ApiError(StatusCodes.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new ApiError(StatusCodes.FORBIDDEN, message);
  }

  static notFound(message: string) {
    return new ApiError(StatusCodes.NOT_FOUND, message);
  }

  static internal(message: string) {
    return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}