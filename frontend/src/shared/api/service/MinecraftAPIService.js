import api from '@/shared/api/axiosConfig.js'

class MinecraftAPIService {
  static getPunishments = async (nickname) => {
    return api.get(`/minecraftapi/punishments?username=${nickname}`)
  }

  static changeNickname = async (nickname) => {
    return api.put(`/auth/nickname`, { nickname })
  }
}

export default MinecraftAPIService
