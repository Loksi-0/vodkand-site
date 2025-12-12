import { makeAutoObservable } from "mobx"
import AuthService from "./AuthService.js"
import axios from "axios"

class Store {
    user = {}
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

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

            return response
        } catch(e) {
            return e.response?.data?.message
        }
    }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
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
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})

            return response
        } catch(e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            console.log(e.response?.data?.message)
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