import { Schema, model } from 'mongoose'

const Product = new Schema({
    name: { type: String, unique: true },
    value: { type: String },
    description: { type: String }
})

export default model('Product', Product)