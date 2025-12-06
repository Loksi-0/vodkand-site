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

        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuidv4()
        const user = await User.create({ email, password: hashPassword, activationLink })
        
        this.sendMail(email, activationLink)
        
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

    async getAllUsers() {
        const users = await User.find()
        return users
    }
}

export default new UserService()