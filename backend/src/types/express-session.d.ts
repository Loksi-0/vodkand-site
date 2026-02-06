import 'express-session'

declare module 'express-session' {
  interface SessionData {
    googleAuthTemp?: {
      code: string
      createdAt: number
      email: string
      sub: string
    }
    oauthState?: string
    oauthStateCreatedAt?: number
    pkceVerifier?: string
  }
}
