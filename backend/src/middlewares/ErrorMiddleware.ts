import type { Request, Response } from 'express'
import ApiError from '../exceptions/ApiError.js'
import getEnv from '../helpers/getEnv.js'
import type { NextFunction } from 'express-serve-static-core'

export default (
  err: { status: number },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction
) => {
  if (getEnv('ENABLE_ERRORS_LOG') === 'true' && err.status !== 401) {
    console.log(err)
  }

  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors })
    return
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' })
}
