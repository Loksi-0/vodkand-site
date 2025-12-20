import api from './axiosConfig.js'

class MinecraftAPIService {
    static getPunishments = async (nickname) => {
        return api.get(`/minecraftapi/punishments?username=${nickname}`)
    }

    static changeNickname = async (nickname) => {
        return api.put(`/auth/nickname`, { nickname })
    }
}

export default MinecraftAPIService