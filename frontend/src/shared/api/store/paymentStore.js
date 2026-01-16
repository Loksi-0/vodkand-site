import PaymentService from '@/shared/api/service/PaymentService'

class PaymentStore {
  async createOrder(product) {
    const response = await PaymentService.createOrder(product)

    return response
  }
}

export default PaymentStore
