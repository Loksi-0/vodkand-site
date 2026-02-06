import { type HydratedDocument, Schema, model } from 'mongoose'

const Product = new Schema({
  name: { type: String, unique: true, required: true },
  value: { type: String, required: true },
  description: { type: String, required: true }
})

type IProduct = {
  name: string
  value: string
  description: string
}

export type ProductDocument = HydratedDocument<IProduct>

export default model('Product', Product)
