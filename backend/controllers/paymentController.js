import ipRangeCheck from 'ip-range-check'

import ApiError from '../exceptions/ApiError.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import PaymentService from '../service/PaymentService.js'
import OrderService from '../service/OrderService.js'

class paymentController {
  async createOrder(req, res, next) {
    try {
      const { product } = req.body

      if (!product) {
        throw ApiError.BadRequest('Товар не выбран')
      }

      const productFromDB = await Product.findOne({ name: product })

      if (!productFromDB) {
        throw ApiError.NotFound('Товар не найден')
      }

      const id = req.user.id
      const user = await User.findById(id)

      if (!user) {
        throw ApiError.BadRequest('Пользователь, создающий заказ, не найден')
      }

      const data = await PaymentService.createOrder(productFromDB, user)

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async handleNotification(req, res, next) {
    try {
      const yookassaIps = [
        '185.71.76.0/27',
        '185.71.77.0/27',
        '77.75.153.0/25',
        '77.75.156.11',
        '77.75.156.35',
        '77.75.154.128/25',
        '2a02:5180::/32'
      ]

      const ip =
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket.remoteAddress

      if (!ipRangeCheck(ip, yookassaIps)) {
        return res.status(200).send('forbidden')
      }

      const orderId = req.body.object.id
      const userId = req.body.object.metadata.userId
      const status = req.body.object.status
      const paid = req.body.object.paid

      if (process.env.ENABLE_ERRORS_LOG === 'true') {
        console.log('got notification:', status)
      }

      if (status === 'canceled' || !paid) {
        await OrderService.setStatus(orderId, 'canceled')
        return res.status(200).end()
      }

      await OrderService.setStatus(orderId, 'succeeded')

      const user = await PaymentService.giveAccess(orderId, userId)

      return res.status(200).json(user)
    } catch (e) {
      if (process.env.ENABLE_ERRORS_LOG === 'true') {
        console.log(e)
      }

      return res.status(200).end()
    }
  }
}

export default new paymentController()
