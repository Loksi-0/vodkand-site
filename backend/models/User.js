import { Schema, model } from 'mongoose'

const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, default: null },
    nickname: { type: String, default: null },
    isActivated: { type: Boolean, default: false },
    hasPass: { type: Boolean, default: false },
    activationLink: { type: String, default: null },
    sub: { type: String, default: null },
    creationDate: { type: Date, required: true },
    agreedTerms: { type: Boolean, default: false },
    agreedTermsAt: { type: Date, default: null },
    agreedTermsSource: { type: String, enum: ['checkout'], default: null }
})

export default model('User', User)