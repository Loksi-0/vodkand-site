import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import MailService from './MailService.js'
import TokenService from './TokenService.js'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiError.js'
import 'dotenv/config'

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({ email })

        if(candidate) {
            throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`, ['alreadyExists'])
        }

        const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12

        const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const activationLink = uuidv4()
        const creationDate = new Date()
        const user = await User.create({ email, password: hashPassword, activationLink, creationDate })
        
        await this.sendMail(email, activationLink)
        
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async googleAuth(email, sub) {
        let user = await User.findOne({ email })

        if (user) {
            const isSubEquals = sub === user.sub

            if (user.password) {
                throw ApiError.BadRequest('На этом аккаунте уже используется способ входа по паролю. Вход несколькими способами пока что недоступен')
            }

            if (!isSubEquals) {
                throw ApiError.BadRequest('Уникальный айди (sub) не совпадает с зарегистрированным ранее')
            }
        } else {
            const creationDate = new Date()
            user = await User.create({ email, sub, isActivated: true, creationDate })
        }
        
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await User.findOne({ activationLink })

        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }

        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({ email })

        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }

        if (user.sub) {
            throw ApiError.BadRequest('К этому аккаунту уже привязан вход с Google. Пожалуйста, войдите через Google')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль', ['wrongPassword'])
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        
        const user = await User.findById(userData.id)

        if (!user) {
            await TokenService.removeToken(refreshToken)
            throw ApiError.UnauthorizedError()
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async sendMail(email, activationLink) {
        const user = await User.findOne({ email })

        if (!user || user.isActivated) {
            throw ApiError.BadRequest(`Пользователя с почтой ${email} не существует или аккаунт уже активирован`, ['doesNotExist', 'alreadyActivated'])
        }

        const link = activationLink ? activationLink : user.activationLink

        await MailService.sendActivationMail(email, `${process.env.CLIENT_URL}/activate?link=${link}`)
    }

    async changeNickname(nickname, email) {
        const candidate = await User.findOne({ nickname })

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с ником ${nickname} уже в вайтлисте`, ['alreadyExists'])
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw ApiError.NotFound('Не удалось найти пользователя')
        } else if (user.nickname) {
            throw ApiError.BadRequest(`Пользователь ${email} уже установил себе ник`)
        }

        user.nickname = nickname
        await user.save()
    }

    async hasUser(email) {
        const user = await User.findOne({ email })

        if (user) {
            return true
        } else {
            return false
        }
    }
}

export default new UserService()