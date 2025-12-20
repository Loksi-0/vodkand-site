import { validationResult } from 'express-validator'
import UserService from '../service/UserService.js'
import ApiError from '../exceptions/apiError.js'

class authController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const { email, password } = req.body
            const userData = await UserService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            })

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async googleAuth(req, res, next) {
        try {
            const temp = req.session.googleAuthTemp

            if (!temp || Date.now() - temp.createdAt > 10 * 60 * 1000) {
                throw ApiError.BadRequest('Auth expired')
            }

            delete req.session.googleAuthTemp

            const { email, sub } = temp

            const userData = await UserService.googleAuth(email, sub)
            res.cookie('refreshToken', userData.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            })

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await UserService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            })

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            })

            return res.json(token)
        } catch(e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            
            return res.status(200).end()
        } catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await UserService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            })

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async sendMail(req, res, next) {
        try {
            const { email } = req.body

            await UserService.sendMail(email)

            return res.status(200).end()
        } catch(e) {
            next(e)
        }
    }

    async changeNickname(req, res, next) {
        try {
            const { nickname, email } = req.body
            await UserService.changeNickname(nickname, email)

            return res.status(200).end()
        } catch(e) {
            next(e)
        }
    }

    async hasUser(req, res, next) {
        try {
            const email = req.query.email
            const hasUser = await UserService.hasUser(email)

            return res.json(hasUser)
        } catch(e) {
            next(e)
        }
    }
}

export default new authController()