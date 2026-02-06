import { type HydratedDocument, Schema, model } from 'mongoose'

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

type IUser = {
  email: string
  password: string
  nickname: string | null
  isActivated: boolean
  hasPass: boolean
  activationLink: string
  sub: string | null
  creationDate: Date
  agreedTerms: boolean
  agreedTermsAt: Date
  agreedTermsSource: 'checkout'
}

export type UserDocument = HydratedDocument<IUser>

export default model('User', User)
