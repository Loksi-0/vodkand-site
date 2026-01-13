import ProductsService from '../service/ProductsService.js'

class ProductsController {
  async getAll(req, res, next) {
    try {
      const response = await ProductsService.getAll()

      res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      const { slug } = req.params

      const response = await ProductsService.getOne(slug)

      res.json(response)
    } catch(e) {
      next(e)
    }
  }
}

export default new ProductsController()