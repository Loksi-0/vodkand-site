import { type HydratedDocument, Schema, model, type Types } from 'mongoose'

const Token = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
})

type IToken = {
  user: Types.ObjectId
  refreshToken: string
  createdAt: Date
}

export type TokenDocument = HydratedDocument<IToken>

export default model('Token', Token)
