import api from '@/shared/api/axiosConfig'
import { AuthType, UserType } from './auth.types'

class AuthService {
  registration = async (email: string, password: string) => {
    return api.post<AuthType>('/auth/registration', { email, password })
  }

  login = async (email: string, password: string) => {
    return api.post<AuthType>('/auth/login', { email, password })
  }

  googleAuth = async (code: string) => {
    return api.post<AuthType>('/auth/googleauth', { code })
  }

  logout = async () => {
    return api.post<string>('/auth/logout')
  }

  activate = async (link: string) => {
    return api.get(`/activate/${link}`)
  }

  sendMail = async (email: string) => {
    return api.post('/sendmail', { email })
  }

  me = async () => {
    return api.get<UserType>('/me')
  }

  agree = async (formData: { source: string; agreed: boolean }) => {
    return api.post<UserType>('/agree', { formData })
  }
}

export default new AuthService()
