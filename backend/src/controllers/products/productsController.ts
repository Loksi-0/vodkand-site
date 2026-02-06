import ProductsService from '../../service/ProductsService.js'
import type { NextFunction, Request, Response } from 'express'

class ProductsController {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await ProductsService.getAll()

      res.json(response)
    } catch (e) {
      next(e)
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params

      const response = await ProductsService.getOne(String(slug))

      res.json(response)
    } catch (e) {
      next(e)
    }
  }
}

export default new ProductsController()
