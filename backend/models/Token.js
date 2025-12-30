import { Schema, model } from 'mongoose'

const Token = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
})

export default model('Token', Token)