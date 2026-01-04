import { Schema, model } from 'mongoose'

const Order = new Schema({
    orderId: { type: String, unique: true, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'canceled', 'succeeded'], required: true },
    value: { type: String, required: true },
    description: { type: String, required: true },
    creationDate: { type: Date, unique: true, required: true },
    fullfillmentDate: { type: Date, unique: true, default: null }
})

export default model('Order', Order)