import { Schema, model } from 'mongoose'

const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: true },
    nickname: { type: String, unique: true, default: null },
    isActivated: { type: Boolean, default: false },
    hasPass: { type: Boolean, default: false },
    activationLink: { type: String }
})

export default model('User', User)