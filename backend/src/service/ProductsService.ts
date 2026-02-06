import Product from '../models/Product.js'
import ApiError from '../exceptions/ApiError.js'

class ProductsService {
  getAll = async () => {
    const products = await Product.find()

    return products
  }

  getOne = async (name: string) => {
    if (!name) {
      throw ApiError.BadRequest('Не указано имя продукта')
    }

    const product = await Product.findOne({ name })

    return product
  }
}

export default new ProductsService()
