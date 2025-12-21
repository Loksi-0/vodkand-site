import { makeAutoObservable } from "mobx"
import AuthService from "./AuthService.js"
import { setAccessToken, clearAccessToken, getAccessToken } from './TokenManager'
import { refreshToken } from "./refreshToken.js"
import MinecraftAPIService from "./MinecraftAPIService.js"

class Store {
    user = null
    isAuth = false
    isLoading = false

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
        try {
            const response = await AuthService.registration(email, password)
            setAccessToken(response.data.accessToken)
            localStorage.setItem('wasAuth', true)
            this.setAuth(true)
            this.setUser(response.data.user)

            return response
        } catch(e) {
            throw e
        }
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            setAccessToken(response.data.accessToken)
            localStorage.setItem('wasAuth', true)
            this.setAuth(true)
            this.setUser(response.data.user)

            return response
        } catch(e) {
            throw e
        }
    }

    async googleAuth(code) {
        try {
            const response = await AuthService.googleAuth(code)
            setAccessToken(response.data.accessToken)
            localStorage.setItem('wasAuth', true)
            this.setAuth(true)
            this.setUser(response.data.user)

            return response
        } catch(e) {
            throw e
        }
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
        } catch(e) {
            throw e
        } finally {
            this.setLoading(false)
        }
    }

    async initAuth() {
        if (!localStorage.getItem('wasAuth')) {
            this.setAuth(false)
            this.setUser(null)
            return
        }

        this.setLoading(true)

        try {
            const response = await AuthService.me()

            this.setAuth(true)
            this.setUser(response.data.user)

            return response
        } catch(e) {
            this.setUser(null)
            this.setAuth(false)
        } finally {
            this.setLoading(false)
        }
    }

    async sendMail(email) {
        try {
            await AuthService.sendMail(email)
        } catch(e) {
            throw e
        }
    }

    async changeNickname(nickname) {
        try {
            const response = await MinecraftAPIService.changeNickname(nickname)

            return response
        } catch(e) {
            throw e
        }
    }

    async getPunishments(nickname) {
        try {
            const response = await MinecraftAPIService.getPunishments(nickname)

            return response
        } catch(e) {
            throw e
        }
    }
}

export default Store