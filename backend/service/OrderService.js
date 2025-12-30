import ApiError from "../exceptions/ApiError.js"
import Order from "../models/Order.js"

class OrderService {
    async create(orderId, userId, value) {
        if (!orderId || !userId || !value) {
            throw ApiError.BadRequest('Необходимо указать orderId, userId и value')
        }

        const order = await Order.create({ orderId, userId, value })

        return order
    }

    async get(orderId) {
        if (!orderId) {
            throw ApiError.BadRequest('Необходимо указать orderId')
        }

        const order = await Order.findOne({ orderId })

        return order
    }

    async setStatus(orderId, status) {
        if (!orderId || !status) {
            throw ApiError.BadRequest('Необходимо указать orderId и status')
        }

        const order = await Order.findOne({ orderId })

        if (!order) {
            throw ApiError.NotFound('Заказ не найден')
        }

        order.status = status
        await order.save()

        return order
    }

    async delete(orderId) {
        if (!orderId) {
            throw ApiError.BadRequest('Необходимо указать orderId')
        }

        const order = await Order.findOne({ orderId })
        
        if (order.status !== 'succeeded') {
            throw ApiError.BadRequest('Заказ еще не выполнен успешно')
        }

        await Order.findByIdAndDelete(order._id)

        return order
    }
}

export default new OrderService()