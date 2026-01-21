import ApiError from '../exceptions/ApiError.js'
import MinecraftAPIService from '../service/MinecraftAPIService.js'

class minecraftAPIController {
  async getPlayerPunishments(req, res, next) {
    try {
      const username = req.query.username

      if (!username) {
        throw ApiError.BadRequest('Необходимо указать username')
      }

      const data = await MinecraftAPIService.getPlayerPunishments(username)

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async getWhitelist(req, res, next) {
    try {
      const data = await MinecraftAPIService.getWhitelist()

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async postWhitelist(req, res, next) {
    try {
      const nickname = req.body?.nickname

      if (!nickname) {
        throw ApiError.BadRequest('Необходимо указать nickname')
      }

      const data = await MinecraftAPIService.postWhitelist(nickname)

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }
}

export default new minecraftAPIController()
