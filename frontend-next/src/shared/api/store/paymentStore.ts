import PaymentService from '@/shared/api/service/paymentService/PaymentService'

class PaymentStore {
  async createOrder(product: string) {
    const response = await PaymentService.createOrder(product)

    return response
  }
}

export default PaymentStore
