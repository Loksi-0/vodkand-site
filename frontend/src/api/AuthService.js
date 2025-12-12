import api from './axiosConfig.js'

class AuthService {
    static login = async (email, password) => {
        return api.post('/login', { email, password })
    }

    static registration = async (email, password) => {
        return api.post('/registration', { email, password })
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