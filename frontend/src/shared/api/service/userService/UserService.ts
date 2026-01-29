import api from '@/shared/api/axiosConfig.js'

class UserService {
  hasUser = async (email: string) => {
    return api.get<boolean>(`/user?email=${email}`)
  }
}

export default new UserService()
