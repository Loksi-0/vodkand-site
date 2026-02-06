export type User = {
  email: string
  id: string
  isActivated: boolean
  nickname: string | null
  hasPass: boolean
  activationLink: string | null
  sub: string | null
  creationDate: NativeDate
  agreedTerms: boolean
  agreedTermsAt: NativeDate
  agreedTermsSource: string
}
