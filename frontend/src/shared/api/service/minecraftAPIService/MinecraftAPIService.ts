import api from '@/shared/api/axiosConfig.js'
import { PunishmentsType } from '@/shared/api/service/minecraftAPIService/minecraftAPI.types'

class MinecraftAPIService {
  getPunishments = async (nickname: string) => {
    return api.get<PunishmentsType>(
      `/minecraftapi/punishments?username=${nickname}`
    )
  }

  changeNickname = async (nickname: string) => {
    return api.put(`/auth/nickname`, { nickname })
  }
}

export default new MinecraftAPIService()
