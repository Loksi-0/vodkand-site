import type { Response } from 'express'
import getEnv from './getEnv.js'

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: getEnv('NODE_ENV') === 'production',
    sameSite: 'lax',
    path: '/'
  })
}

const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: getEnv('NODE_ENV') === 'production',
    sameSite: 'lax',
    path: '/'
  })
}

export { setRefreshTokenCookie, clearRefreshTokenCookie }
