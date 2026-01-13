import api from '../axiosConfig.js'

class UserService {
  static fetchUsers = async () => {
    return api.get('/users')
  }

  static hasUser = async (email) => {
    return api.get(`/user?email=${email}`)
  }
}

export default UserService
