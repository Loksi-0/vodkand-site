import type { UserDocument } from '../models/User.js'

export default class UserDto {
  email: string
  password: string
  id: string
  isActivated: boolean
  nickname: string | null
  hasPass: boolean
  activationLink: string | null
  sub: string | null
  creationDate: Timestamp
  agreedTerms: boolean
  agreedTermsAt: Timestamp
  agreedTermsSource: string

  constructor(model: UserDocument) {
    this.email = model.email
    this.password = model.password
    this.id = model._id.toString()
    this.isActivated = model.isActivated
    this.nickname = model.nickname
    this.hasPass = model.hasPass
    this.activationLink = model.activationLink
    this.sub = model.sub
    this.creationDate = model.creationDate.getTime()
    this.agreedTerms = model.agreedTerms
    this.agreedTermsAt = model.agreedTermsAt.getTime()
    this.agreedTermsSource = model.agreedTermsSource
  }
}
