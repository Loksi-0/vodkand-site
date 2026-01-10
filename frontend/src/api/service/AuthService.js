import api from '../axiosConfig.js'

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

  static activate = async (link) => {
    return api.get(`/activate/${link}`)
  }

  static sendMail = async (email) => {
    return api.post('/sendmail', { email })
  }

  static me = async () => {
    return api.get('/me')
  }

  static agree = async (formData) => {
    return api.post('/agree', { formData })
  }
}

export default AuthService
