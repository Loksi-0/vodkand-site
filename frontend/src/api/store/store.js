import { makeAutoObservable } from 'mobx'
import AuthService from '../service/AuthService.js'
import UserService from '../service/UserService.js'
import { setAccessToken, clearAccessToken } from '../TokenManager.js'
import { refreshToken } from '../refreshToken.js'
import MinecraftAPIService from '../service/MinecraftAPIService.js'
import PaymentService from '../service/PaymentService.js'

class Store {
  user = null
  isAuth = false
  isLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool) {
    this.isAuth = bool
  }

  setUser(user) {
    this.user = user
  }

  setLoading(bool) {
    this.isLoading = bool
  }

  async registration(email, password) {
    const response = await AuthService.registration(email, password)
    setAccessToken(response.data.accessToken)
    localStorage.setItem('wasAuth', true)
    this.setAuth(true)
    this.setUser(response.data.user)

    return response
  }

  async login(email, password) {
    const response = await AuthService.login(email, password)
    setAccessToken(response.data.accessToken)
    localStorage.setItem('wasAuth', true)
    this.setAuth(true)
    this.setUser(response.data.user)

    return response
  }

  async googleAuth(code) {
    const response = await AuthService.googleAuth(code)
    setAccessToken(response.data.accessToken)
    localStorage.setItem('wasAuth', true)
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
      this.setUser(response.data?.user)

      return response
    } catch {
      this.setUser(null)
      this.setAuth(false)
    } finally {
      this.setLoading(false)
    }
  }

  async activate(link) {
    const response = await AuthService.activate(link)

    return response
  }

  async sendMail(email) {
    await AuthService.sendMail(email)
  }

  async changeNickname(nickname) {
    const response = await MinecraftAPIService.changeNickname(nickname)

    return response
  }

  async agreeTerms(formData) {
    const response = await AuthService.agree(formData)

    return response
  }

  async createOrder(product) {
    const response = await PaymentService.createOrder(product)

    return response
  }

  async getPunishments(nickname) {
    const response = await MinecraftAPIService.getPunishments(nickname)

    return response
  }

  async getGallery(page) {
    const response = await UserService.getGallery(page)

    return response
  }
}

export default Store
