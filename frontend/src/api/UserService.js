import api from './axiosConfig.js'

class UserService {
    static fetchUsers = async () => {
        return api.get('/users')
    }

    static getGallery = async (page) => {
        return api.get(`/gallery/${page}`)
    }
}

export default UserService