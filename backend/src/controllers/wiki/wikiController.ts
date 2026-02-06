import type { Request, Response, NextFunction } from 'express'
import WikiService from '../../database/wiki/WikiService.js'

class wikiController {
  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chapter, page } = req.params

      const fullPage = await WikiService.getPage(String(chapter), String(page))

      return res.json(fullPage)
    } catch (e) {
      next(e)
    }
  }

  navigation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chapter } = req.params

      const nav = await WikiService.getNavigation(String(chapter))

      return res.json(nav)
    } catch (e) {
      next(e)
    }
  }
}

export default new wikiController()
