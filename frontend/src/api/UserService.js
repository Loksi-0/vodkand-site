const { default: api } = require("./axiosConfig")

class UserService {
    static fetchUsers = () => {
        return api.get('/users')
    }
}

export default UserService