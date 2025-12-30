import { Schema, model } from 'mongoose'

const Product = new Schema({
    name: { type: String, unique: true },
    value: { type: String }
})

export default model('Product', Product)