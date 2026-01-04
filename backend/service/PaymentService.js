import { v4 as uuidv4 } from 'uuid'
import ApiError from '../exceptions/ApiError.js'
import OrderService from './OrderService.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
import MailService from './MailService.js'

class PaymentService {
    async createOrder(product, user) {
        const authKey = Buffer
            .from(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET_KEY}`)
            .toString('base64')

        const idempotenceKey = uuidv4()

        const payload = {
            amount: {
                value: product.value,
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            confirmation: {
                type: 'redirect',
                return_url: process.env.YOOKASSA_REDIRECT_URL
            },
            capture: true,
            metadata: {
                userId: user._id
            }
        }

        const response = await fetch(`${process.env.YOOKASSA_ENDPOINT}/payments`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authKey}`,
                'Content-Type': 'application/json',
                'Idempotence-Key': idempotenceKey
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const error = await response.json()

            throw new ApiError(response.status, error.description)
        }

        const data = await response.json()

        await OrderService.create(data.id, user, product)

        return data
    }

    async giveAccess(orderId, userId) {
        if (!orderId || !userId) {
            throw ApiError.BadRequest('Необходимо указать orderId и userId')
        }

        const order = await Order.findOne({ orderId })
        const user = await User.findById(userId)

        if (!order || !user) {
            throw ApiError.NotFound('Не удалось найти заказ или пользователя')
        }

        if (order.userId.toString() !== user._id.toString()) {
            throw ApiError.BadRequest('У этого пользователя не найдено этого заказа')
        }

        order.fullfillmentDate = Date.now()
        await order.save()

        await MailService.sendSuccessNotification(order)

        user.hasPass = true
        await user.save()

        return user
    }
}

export default new PaymentService()