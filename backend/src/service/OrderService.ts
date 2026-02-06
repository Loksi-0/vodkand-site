import ApiError from '../exceptions/ApiError.js'
import Order from '../models/Order.js'
import type { ProductDocument } from '../models/Product.js'
import type { UserDocument } from '../models/User.js'

class OrderService {
  create = async (
    orderId: string,
    user: UserDocument,
    product: ProductDocument
  ) => {
    if (!orderId || !user.email || !product.value) {
      throw ApiError.BadRequest('Необходимо указать orderId, user и product')
    }

    const { value, description } = product
    const creationDate = new NativeDate()

    const order = await Order.create({
      orderId,
      user: user._id,
      value,
      description,
      creationDate
    })

    return order
  }

  get = async (orderId: string) => {
    if (!orderId) {
      throw ApiError.BadRequest('Необходимо указать orderId')
    }

    const order = await Order.findOne({ orderId })

    return order
  }

  setStatus = async (
    orderId: string,
    status?: 'pending' | 'canceled' | 'succeeded'
  ) => {
    if (!orderId || !status) {
      throw ApiError.BadRequest('Необходимо указать orderId и status')
    }

    const order = await Order.findOne({ orderId })

    if (!order) {
      throw ApiError.NotFound('Заказ не найден')
    }

    if (status === 'succeeded') {
      order.creationDate = new NativeDate()
    }

    order.status = status
    await order.save()

    return order
  }

  delete = async (orderId: string) => {
    if (!orderId) {
      throw ApiError.BadRequest('Необходимо указать orderId')
    }

    const order = await Order.findOne({ orderId })

    if (!order) {
      throw ApiError.InternalError('Заказ не найден')
    }

    if (order.status !== 'succeeded') {
      throw ApiError.BadRequest('Заказ еще не выполнен успешно')
    }

    await Order.findByIdAndDelete(order._id)

    return order
  }
}

export default new OrderService()
