import TokenService from '../service/TokenService.js'
import ApiError from '../exceptions/ApiError.js'
import type { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw ApiError.UnauthorizedError()
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateAccessToken(accessToken)
    if (!userData) {
      throw ApiError.UnauthorizedError()
    }

    req.user = userData
    next()
  } catch (e) {
    next(e)
  }
}
