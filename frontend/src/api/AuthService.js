import api from './axiosConfig.js'

class AuthService {
    static registration = async (email, password) => {
        return api.post('/auth/registration', { email, password })
    }

    static login = async (email, password) => {
        return api.post('/auth/login', { email, password })
    }

    static googleAuth = async (code) => {
        return api.post('/auth/googleauth', { code })
    }

    static logout = async () => {
        return api.post('/auth/logout')
    }

    static sendMail = async (email) => {
        return api.post('/sendmail', { email })
    }

    static changeNickname = async (nickname, email) => {
        return api.put('/auth/nickname', { nickname, email })
    }
}

export default AuthService