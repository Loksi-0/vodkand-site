export type AuthBody = {
  email: string
  password: string
}

export type GoogleAuthBody = {
  code: string
}

export type ActivateBody = {
  link: string
}

export type MailBody = {
  email: string
}

export type NicknameBody = {
  nickname: string
}

export type AgreeTermsBody = {
  formData: {
    agreed: boolean
    source: 'checkout'
  }
}

export type HasUserQuery = {
  email: string
}
