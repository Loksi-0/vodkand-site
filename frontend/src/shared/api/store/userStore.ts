import { makeAutoObservable } from 'mobx'
import AuthService from '@/shared/api/service/authService/AuthService.js'
import { setAccessToken, clearAccessToken } from '@/shared/api/TokenManager.js'
import { refreshToken } from '@/shared/api/refreshToken.js'
import MinecraftAPIService from '@/shared/api/service/minecraftAPIService/MinecraftAPIService.js'
import UserService from '@/shared/api/service/userService/UserService.js'

type UserType = {
  email: string
  id: string
  isActivated: boolean
  nickname: string | null
  hasPass: boolean
  activationLink: string | null
  sub: string | null
  creationDate: Date
  agreedTerms: boolean
  agreedTermsAt: Date | null
  agreedTermsSource: string
}

class UserStore {
  user: UserType | null = null
  isAuth = false
  isLoading = true
  cart = ''

  constructor() {
    makeAutoObservable(this)

    if (localStorage.getItem('cart')) {
      this.setCart(localStorage.getItem('cart'))
    } else {
      this.setCart('')
    }
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: UserType | null) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setCart(string: string | null) {
    if (!string) {
      return
    }

    this.cart = string
    localStorage.setItem('cart', string)
  }

  async registration(email: string, password: string) {
    const response = await AuthService.registration(email, password)
    setAccessToken(response.data.accessToken)
    localStorage.setItem('wasAuth', 'true')
    this.setAuth(true)
    this.setUser(response.data.user)

    return response
  }

  async login(email: string, password: string) {
    const response = await AuthService.login(email, password)
    setAccessToken(response.data.accessToken)
    localStorage.setItem('wasAuth', 'true')
    this.setAuth(true)
    this.setUser(response.data.user)

    return response
  }

  async googleAuth(code: string) {
    const response = await AuthService.googleAuth(code)
    setAccessToken(response.data.accessToken)
    localStorage.setItem('wasAuth', 'true')
    this.setAuth(true)
    this.setUser(response.data.user)

    return response
  }

  async logout() {
    this.setLoading(true)

    try {
      const response = await AuthService.logout()
      clearAccessToken()
      localStorage.removeItem('wasAuth')
      this.setAuth(false)
      this.setUser(null)

      return response
    } finally {
      this.setLoading(false)
    }
  }

  async initAuth() {
    if (!localStorage.getItem('wasAuth')) {
      this.setAuth(false)
      this.setUser(null)
      this.setLoading(false)
      return
    }

    this.setLoading(true)

    try {
      await refreshToken()

      const response = await AuthService.me()

      this.setAuth(true)
      this.setUser(response.data)

      return response
    } catch {
      this.setUser(null)
      this.setAuth(false)
    } finally {
      this.setLoading(false)
    }
  }

  async activate(link: string) {
    const response = await AuthService.activate(link)

    return response
  }

  async sendMail(email: string) {
    await AuthService.sendMail(email)
  }

  async hasUser(email: string) {
    const response = await UserService.hasUser(email)

    return response
  }

  async changeNickname(nickname: string) {
    const response = await MinecraftAPIService.changeNickname(nickname)

    return response
  }

  async agreeTerms(formData: { source: string; agreed: boolean }) {
    const response = await AuthService.agree(formData)

    return response
  }

  async getPunishments(nickname: string) {
    const response = await MinecraftAPIService.getPunishments(nickname)

    return response
  }
}

export default UserStore
