export default class ApiError extends Error {
  status
  errors

  constructor(status: number, message: string, errors: string[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError = () => {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest = (message: string, errors: string[] = []) => {
    return new ApiError(400, message, errors)
  }

  static NotFound = (message: string, errors: string[] = []) => {
    return new ApiError(404, message, errors)
  }

  static Conflict = (message: string, errors: string[] = []) => {
    return new ApiError(409, message, errors)
  }

  static InternalError = (message: string, errors: string[] = []) => {
    return new ApiError(500, message, errors)
  }
}
