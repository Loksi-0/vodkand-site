import type { Request, Response, NextFunction } from 'express'
import MinecraftAPIService from '../../service/MinecraftAPIService.js'
import type { GetPlayerPunishmentsQuery, PostWhitelistBody } from './types.js'

class minecraftAPIController {
  getPlayerPunishments = async (
    req: QueryRequest<GetPlayerPunishmentsQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const username = req.query.username

      const data = await MinecraftAPIService.getPlayerPunishments(username)

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }

  getWhitelist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await MinecraftAPIService.getWhitelist()

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }

  postWhitelist = async (
    req: BodyRequest<PostWhitelistBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const nickname = req.body.nickname

      const data = await MinecraftAPIService.postWhitelist(nickname)

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }
}

export default new minecraftAPIController()
