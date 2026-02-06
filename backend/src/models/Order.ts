import { type HydratedDocument, Schema, model, type Types } from 'mongoose'

const Order = new Schema({
  orderId: { type: String, unique: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'canceled', 'succeeded'],
    required: true
  },
  value: { type: String, required: true },
  description: { type: String, required: true },
  creationDate: { type: Date, required: true },
  fullfillmentDate: { type: Date, default: null }
})

type IOrder = {
  orderId: string
  user: Types.ObjectId
  status: 'pending' | 'canceled' | 'succeeded'
  value: string
  description: string
  creationDate: Date
  fullfillmentDate: Date | null
}

export type OrderDocument = HydratedDocument<IOrder>

export default model('Order', Order)
