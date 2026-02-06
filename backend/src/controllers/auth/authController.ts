import { validationResult } from 'express-validator'
import UserService from '../../service/UserService.js'
import ApiError from '../../exceptions/ApiError.js'
import type { Request, Response, NextFunction } from 'express'
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie
} from '../../helpers/refreshTokenCookie.js'
import type {
  ActivateBody,
  AgreeTermsBody,
  AuthBody,
  GoogleAuthBody,
  HasUserQuery,
  MailBody,
  NicknameBody
} from './types.js'

class authController {
  registration = async (
    req: BodyRequest<AuthBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest(
          'Ошибка при валидации',
          errors.array().map((e) => String(e.msg))
        )
      }

      const { email, password } = req.body

      const userData = await UserService.registration(email, password)

      setRefreshTokenCookie(res, userData.refreshToken)

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  googleAuth = async (
    req: BodyRequest<GoogleAuthBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const code = req.body.code
      const temp = req.session.googleAuthTemp

      const userData = await UserService.googleAuth(code, temp)

      delete req.session.googleAuthTemp

      setRefreshTokenCookie(res, userData.refreshToken)

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  login = async (
    req: BodyRequest<AuthBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body
      const userData = await UserService.login(email, password)

      setRefreshTokenCookie(res, userData.refreshToken)

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken as string

      if (!refreshToken) {
        return res.status(204).end()
      }

      const token = await UserService.logout(refreshToken)

      clearRefreshTokenCookie(res)

      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  activate = async (
    req: Request<ActivateBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const activationLink = req.params.link

      await UserService.activate(activationLink)

      return res.status(200).end()
    } catch (e) {
      next(e)
    }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken as string
      const userData = await UserService.refresh(refreshToken)

      setRefreshTokenCookie(res, userData.refreshToken)

      return res.json({
        accessToken: userData.accessToken
      })
    } catch (e) {
      next(e)
    }
  }

  sendMail = async (
    req: BodyRequest<MailBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body

      await UserService.sendMail(email)

      return res.status(200).end()
    } catch (e) {
      next(e)
    }
  }

  changeNickname = async (
    req: BodyRequest<NicknameBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { nickname } = req.body
      const userId = req.user.id

      await UserService.changeNickname(nickname, userId)

      return res.status(200).end()
    } catch (e) {
      next(e)
    }
  }

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken as string

      const user = await UserService.me(refreshToken)

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  agree = async (
    req: BodyRequest<AgreeTermsBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user
      const { formData } = req.body

      const userData = await UserService.agree(user, formData)

      return res.json({ user: userData })
    } catch (e) {
      next(e)
    }
  }

  hasUser = async (
    req: QueryRequest<HasUserQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email = req.query.email
      const hasUser = await UserService.hasUser(email)

      return res.json(hasUser)
    } catch (e) {
      next(e)
    }
  }
}

export default new authController()
