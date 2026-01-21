import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'
import ApiError from '../exceptions/ApiError.js'

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m'
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    })

    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    if (!refreshToken || !userId) {
      throw ApiError.BadRequest('отсутствует поле refreshToken или userId')
    }

    const token = await Token.create({ user: userId, refreshToken })

    const tokens = await Token.find({ user: userId }).sort({ createdAt: -1 })

    if (tokens.length > Number(process.env.MAX_REFRESH_TOKENS_FOR_USER)) {
      const old = tokens.slice(Number(process.env.MAX_REFRESH_TOKENS_FOR_USER))
      await Token.deleteMany({ _id: { $in: old.map((t) => t._id) } })
    }

    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken })
    return tokenData
  }
}

export default new TokenService()
