import { v4 as uuidv4 } from 'uuid'
import ApiError from '../exceptions/ApiError.js'
import OrderService from './OrderService.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
import MailService from './MailService.js'
import getEnv from '../helpers/getEnv.js'
import Product from '../models/Product.js'

class PaymentService {
  createOrder = async (productName: string, userId: string) => {
    if (!productName) {
      throw ApiError.BadRequest('Товар не выбран')
    }

    const product = await Product.findOne({ name: productName })
    const user = await User.findById(userId)

    if (!product) {
      throw ApiError.NotFound('Товар не найден')
    }

    if (!user) {
      throw ApiError.BadRequest('Пользователь, создающий заказ, не найден')
    }

    const authKey = Buffer.from(
      `${getEnv('YOOKASSA_SHOP_ID')}:${getEnv('YOOKASSA_SECRET_KEY')}`
    ).toString('base64')

    const idempotenceKey = uuidv4()

    const payload = {
      amount: {
        value: product.value,
        currency: 'RUB'
      },
      confirmation: {
        type: 'redirect',
        return_url: getEnv('YOOKASSA_REDIRECT_URL')
      },
      capture: true,
      metadata: {
        userId: user._id
      }
    }

    const response = await fetch(`${getEnv('YOOKASSA_ENDPOINT')}/payments`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authKey}`,
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const error = (await response.json()) as { description: string }

      throw new ApiError(response.status, error.description)
    }

    const data = (await response.json()) as { id: string }

    await OrderService.create(data.id, user, product)

    return data
  }

  giveAccess = async (orderId: string, userId: string) => {
    if (!orderId || !userId) {
      throw ApiError.BadRequest('Необходимо указать orderId и userId')
    }

    const order = await Order.findOne({ orderId })

    if (!order) {
      throw ApiError.NotFound('Заказ не найден')
    }

    const userFromOrder = await User.findById(order.user)

    if (!userFromOrder) {
      throw ApiError.NotFound('Не удалось найти пользователя')
    }

    if (userFromOrder._id.toString() !== userId) {
      throw ApiError.BadRequest('У этого пользователя не найдено этого заказа')
    }

    order.fullfillmentDate = new NativeDate()
    await order.save()

    await MailService.sendSuccessNotification(order)

    userFromOrder.hasPass = true
    await userFromOrder.save()

    return userFromOrder
  }
}

export default new PaymentService()
