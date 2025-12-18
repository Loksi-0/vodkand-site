import api from './axiosConfig.js'

class AuthService {
    static registration = async (email, password) => {
        return api.post('/registration', { email, password })
    }

    static login = async (email, password) => {
        return api.post('/login', { email, password })
    }

    static googleAuth = async (email, sub) => {
        return api.post('/googleauth', { email, sub })
    }

    static logout = async () => {
        return api.post('/logout')
    }

    static sendMail = async (email) => {
        return api.post('/sendmail', { email })
    }

    static changeNickname = async (nickname, email) => {
        return api.put('/nickname', { nickname, email })
    }
}

export default AuthService