/* eslint-disable @typescript-eslint/no-misused-spread */
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import MailService from './MailService.js'
import TokenService from './TokenService.js'
import MinecraftAPIService from './MinecraftAPIService.js'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/ApiError.js'
import 'dotenv/config'
import getEnv from '../helpers/getEnv.js'

class UserService {
  registration = async (email: string, password: string) => {
    const candidate = await User.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтой ${email} уже существует`,
        ['alreadyExists']
      )
    }

    const SALT_ROUNDS = Number(getEnv('BCRYPT_SALT_ROUNDS')) || 12

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const activationLink = uuidv4()
    const creationDate = Date.now()
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
      creationDate
    })

    await this.sendMail(email, activationLink)

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  googleAuth = async (
    code: string,
    temp:
      | { code: string; createdAt: number; email: string; sub: string }
      | undefined
  ) => {
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

    let user = await User.findOne({ email })

    if (user) {
      const isSubEquals = sub === user.sub

      if (user.password) {
        throw ApiError.BadRequest(
          'На этом аккаунте уже используется способ входа по паролю. Вход несколькими способами пока что недоступен'
        )
      }

      if (!isSubEquals) {
        throw ApiError.BadRequest(
          'Уникальный айди (sub) не совпадает с зарегистрированным ранее'
        )
      }
    } else {
      const candidate = await User.findOne({ sub })

      if (candidate) {
        throw ApiError.Conflict('Аккаунт уже зарегистрирован')
      }

      const creationDate = Date.now()
      user = await User.create({ email, sub, isActivated: true, creationDate })
    }

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  activate = async (activationLink: string) => {
    const user = await User.findOne({ activationLink })

    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации')
    }

    user.isActivated = true
    await user.save()
  }

  login = async (email: string, password: string) => {
    const user = await User.findOne({ email })

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден')
    }

    if (user.sub) {
      throw ApiError.BadRequest(
        'К этому аккаунту уже привязан вход с Google. Пожалуйста, войдите через Google'
      )
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

  logout = async (refreshToken: string) => {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }

  refresh = async (refreshToken: string) => {
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

    return { ...tokens }
  }

  sendMail = async (email: string, activationLink?: string) => {
    const user = await User.findOne({ email })

    if (!user || user.isActivated) {
      throw ApiError.BadRequest(
        `Пользователя с почтой ${email} не существует или аккаунт уже активирован`,
        ['doesNotExist', 'alreadyActivated']
      )
    }

    const link = activationLink ? activationLink : user.activationLink

    await MailService.sendActivationMail(
      email,
      `${getEnv('CLIENT_DOMAIN')}/activate?link=${link}`
    )
  }

  changeNickname = async (nickname: string, userId: string) => {
    if (!nickname || !userId) {
      throw ApiError.BadRequest('Необходимо указать никнейм и userId')
    }

    const user = await User.findById(userId)

    if (!user) {
      throw ApiError.NotFound('Не удалось найти пользователя')
    }
    if (user.nickname) {
      throw ApiError.BadRequest(
        `Пользователь ${user.email} уже установил себе ник`
      )
    }

    const candidate = await User.findOne({ nickname })

    if (candidate) {
      throw ApiError.Conflict(`Ник уже в вайтлисте`, ['alreadyExists'])
    }

    await MinecraftAPIService.postWhitelist(nickname)

    user.nickname = nickname
    await user.save()
  }

  me = async (refreshToken: string) => {
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await User.findById(userData.id)

    if (!user || !user.email) {
      await TokenService.removeToken(refreshToken)
      throw ApiError.UnauthorizedError()
    }

    const userDto = new UserDto(user)

    return userDto
  }

  agree = async (
    { id }: { id: string },
    formData: { agreed: boolean; source: 'checkout' }
  ) => {
    const user = await User.findById(id)

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден')
    }

    if (!user.email) {
      throw ApiError.UnauthorizedError()
    }

    if (!formData.agreed) {
      throw ApiError.BadRequest('Согласие не дано')
    }

    user.agreedTerms = true
    user.agreedTermsAt = new NativeDate()
    user.agreedTermsSource = formData.source

    const userData = await user.save()

    return userData
  }

  hasUser = async (email: string) => {
    const user = await User.findOne({ email })

    if (user) {
      return true
    }

    return false
  }
}

export default new UserService()
