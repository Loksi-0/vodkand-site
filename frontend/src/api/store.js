import { makeAutoObservable } from "mobx"
import AuthService from "./AuthService.js"
import { setAccessToken, clearAccessToken } from './TokenManager'
import { refreshToken } from "./refreshToken.js"

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
            return e.response?.data?.message
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
            return e.response?.data?.message
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
            return e.response?.data?.message
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
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async checkAuth() {
        if (!localStorage.getItem('wasAuth')) {
            this.setAuth(false)
            this.setUser(null)
            return
        }

        this.setLoading(true)
        
        try {
            const response = await refreshToken()
            
            setAccessToken(response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

            return response
        } catch(e) {
            this.setAuth(false)
            this.setUser(null)
        } finally {
            this.setLoading(false)
        }
    }

    async sendMail(email) {
        try {
            await AuthService.sendMail(email)
        } catch(e) {
            console.log(e.response?.data?.message)
        }
    }

    async changeNickname(nickname, email) {
        try {
            const response = await AuthService.changeNickname(nickname, email)

            return response
        } catch(e) {
            return e.response?.data?.message
        }
    }
}

export default Store