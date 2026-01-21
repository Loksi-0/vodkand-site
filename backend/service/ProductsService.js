import Product from '../models/Product.js'
import ApiError from '../exceptions/ApiError.js'

class ProductsService {
  async getAll() {
    const products = Product.find()

    return products
  }

  async getOne(name) {
    if (!name) {
      throw ApiError.BadRequest('Не указано имя продукта')
    }

    const product = Product.findOne({ name })

    return product
  }
}

export default new ProductsService()
