export type UserType = {
  email: string
  id: string
  isActivated: boolean
  nickname: string | null
  hasPass: boolean
  activationLink: string | null
  sub: string | null
  creationDate: Date
  agreedTerms: boolean
  agreedTermsAt: Date | null
  agreedTermsSource: string
}

export type AuthType = {
  accessToken: string
  refreshToken: string
  user: UserType
}
