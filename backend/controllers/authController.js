import { validationResult } from 'express-validator'
import UserService from '../service/UserService.js'
import ApiError from '../exceptions/ApiError.js'
import UserDto from '../dtos/userDto.js'
import User from '../models/User.js'

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
                sameSite: 'lax',
                path: '/'
            })

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async googleAuth(req, res, next) {
        try {
            const code = req.body.code
            const temp = req.session.googleAuthTemp

            if (!temp) {
                throw ApiError.BadRequest('Auth expired')
            }

            if (!code || code !== temp.code) {
                throw ApiError.BadRequest('Invalid auth code')
            }

            if (Date.now() - temp.createdAt > 10 * 60 * 1000) {
                throw ApiError.BadRequest('Auth expired')
            }

            const { email, sub } = temp

            delete req.session.googleAuthTemp

            const userData = await UserService.googleAuth(email, sub)

            res.cookie('refreshToken', userData.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/'
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
                sameSite: 'lax',
                path: '/'
            })

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies

            if (!refreshToken) {
                return res.status(204).end()
            }

            const token = await UserService.logout(refreshToken)

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/'
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
                sameSite: 'lax',
                path: '/'
            })

            return res.json({
                accessToken: userData.accessToken
            })
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
            const { nickname } = req.body
            const userId = req.user.id

            await UserService.changeNickname(nickname, userId)

            return res.status(200).end()
        } catch(e) {
            next(e)
        }
    }

    async me(req, res, next) {
        try {
            const user = req.user

            if (!user) {
                throw ApiError.UnauthorizedError()
            }

            const userData = new UserDto(user)

            return res.json({ user: userData })
        } catch(e) {
            next(e)
        }
    }

    async agree(req, res, next) {
        try {
            const user = req.user
            const { formData } = req.body

            if (!user) {
                throw ApiError.UnauthorizedError()
            }

            const userData = await UserService.agree(user, formData)

            return res.json({ user: userData })
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