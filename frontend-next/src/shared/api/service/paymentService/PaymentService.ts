import api from '@/shared/api/axiosConfig'
import { CreateOrderType } from '@/shared/api/service/paymentService/payment.types'

class PaymentService {
  createOrder = async (product: string) => {
    return api.post<CreateOrderType>('/payment/create', { product })
  }
}

export default new PaymentService()
