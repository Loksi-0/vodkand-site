import ipRangeCheck from 'ip-range-check'

import PaymentService from '../../service/PaymentService.js'
import OrderService from '../../service/OrderService.js'
import getEnv from '../../helpers/getEnv.js'
import type { Response, NextFunction } from 'express'
import type { CreateOrderBody, HandleNotificationBody } from './types.js'

class paymentController {
  createOrder = async (
    req: BodyRequest<CreateOrderBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { product } = req.body
      const id = req.user.id

      const data = await PaymentService.createOrder(product, id)

      return res.json(data)
    } catch (e) {
      next(e)
    }
  }

  handleNotification = async (
    req: BodyRequest<HandleNotificationBody>,
    res: Response
  ) => {
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

      const forwarded = req.headers['x-forwarded-for']

      const ip =
        typeof forwarded === 'string'
          ? forwarded.split(',')[0]
          : req.socket.remoteAddress

      if (!ip || !ipRangeCheck(ip, yookassaIps)) {
        return res.status(200).send('forbidden')
      }

      const orderId = req.body.object.id
      const userId = req.body.object.metadata.userId
      const status = req.body.object.status
      const paid = req.body.object.paid

      if (getEnv('ENABLE_ERRORS_LOG') === 'true') {
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
      if (getEnv('ENABLE_ERRORS_LOG') === 'true') {
        console.log(e)
      }

      return res.status(200).end()
    }
  }
}

export default new paymentController()
