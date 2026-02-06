import 'express'
import UserDto from '../dtos/userDto.js'

declare module 'express-serve-static-core' {
  interface Request {
    cookies: {
      refreshToken?: string
    }
    user: UserDto
  }
}
