import WikiService from '../database/wiki/WikiService.js'

class pluginsController {
  async get(req, res, next) {
    try {
      const { chapter, page } = req.params

      const fullPage = await WikiService.getPage(chapter, page)

      return res.json(fullPage)
    } catch (e) {
      next(e)
    }
  }

  async navigation(req, res, next) {
    try {
      const { chapter } = req.params

      const nav = await WikiService.getNavigation(chapter)

      return res.json(nav)
    } catch (e) {
      next(e)
    }
  }
}

export default new pluginsController()
