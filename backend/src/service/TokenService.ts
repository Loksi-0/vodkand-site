import jwt, { type JwtPayload } from 'jsonwebtoken'
import Token from '../models/Token.js'
import ApiError from '../exceptions/ApiError.js'
import getEnv from '../helpers/getEnv.js'
import UserDto from '../dtos/userDto.js'

interface JwtUserPayload extends JwtPayload {
  user: UserDto
}

class TokenService {
  generateTokens = (payload: UserDto) => {
    const accessToken = jwt.sign(payload, getEnv('JWT_ACCESS_SECRET'), {
      expiresIn: '30m'
    })
    const refreshToken = jwt.sign(payload, getEnv('JWT_REFRESH_SECRET'), {
      expiresIn: '30d'
    })

    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken = (token: string) => {
    try {
      const userData = jwt.verify(
        token,
        getEnv('JWT_ACCESS_SECRET')
      ) as JwtUserPayload['user']

      return userData
    } catch {
      return null
    }
  }

  validateRefreshToken = (token: string) => {
    try {
      const userData = jwt.verify(
        token,
        getEnv('JWT_REFRESH_SECRET')
      ) as JwtUserPayload['user']

      return userData
    } catch {
      return null
    }
  }

  saveToken = async (userId: string, refreshToken: string) => {
    if (!refreshToken || !userId) {
      throw ApiError.BadRequest('отсутствует поле refreshToken или userId')
    }

    const token = await Token.create({ user: userId, refreshToken })

    const tokens = await Token.find({ user: userId }).sort({ createdAt: -1 })

    if (tokens.length > Number(getEnv('MAX_REFRESH_TOKENS_FOR_USER'))) {
      const old = tokens.slice(Number(getEnv('MAX_REFRESH_TOKENS_FOR_USER')))
      await Token.deleteMany({ _id: { $in: old.map((t) => t._id) } })
    }

    return token
  }

  removeToken = async (refreshToken: string) => {
    const tokenData = await Token.deleteOne({ refreshToken })

    return tokenData
  }

  findToken = async (refreshToken: string) => {
    const tokenData = await Token.findOne({ refreshToken })

    return tokenData
  }
}

export default new TokenService()
