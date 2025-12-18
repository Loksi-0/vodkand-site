import { Schema, model } from 'mongoose'

const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: false, default: null },
    nickname: { type: String, unique: true, default: null },
    isActivated: { type: Boolean, default: false },
    hasPass: { type: Boolean, default: false },
    activationLink: { type: String, default: null },
    sub: { type: String, unique: true, default: null }
})

export default model('User', User)