import api from './axiosConfig.js'

class PaymentService {
    static createOrder = async (product) => {
        return api.post('/payment/create', { product })
    }
}

export default PaymentService