import ApiError from '../exceptions/ApiError.js'
import getEnv from '../helpers/getEnv.js'

class MinecraftAPIService {
  getPlayerPunishments = async (username: string) => {
    if (!username) {
      throw ApiError.BadRequest('Необходимо указать username')
    }

    const response = await fetch(
      `${getEnv('MINECRAFT_API_URL')}/v1/libertybans/all?username=${encodeURIComponent(username)}`,
      {
        headers: {
          Authorization: getEnv('MINECRAFT_API_KEY'),
          Accept: 'application/json'
        }
      }
    )

    if (!response.ok) {
      const json: unknown = await response.json()
      throw ApiError.InternalError(String(json))
    }

    const data: unknown = await response.json()

    return data
  }

  getWhitelist = async () => {
    const response = await fetch(
      `${getEnv('MINECRAFT_API_URL')}/v1/whitelist`,
      {
        headers: {
          Authorization: getEnv('MINECRAFT_API_KEY'),
          Accept: 'application/json'
        }
      }
    )

    if (!response.ok) {
      const json: unknown = await response.json()

      throw new ApiError(response.status, String(json))
    }

    const data: unknown = await response.json()

    return data
  }

  postWhitelist = async (nickname: string) => {
    if (!nickname) {
      throw ApiError.BadRequest('Необходимо указать nickname')
    }

    const response = await fetch(
      `${getEnv('MINECRAFT_API_URL')}/v1/whitelist?username=${nickname}`,
      {
        method: 'POST',
        headers: {
          Authorization: getEnv('MINECRAFT_API_KEY'),
          Accept: 'application/json'
        }
      }
    )

    if (!response.ok) {
      const text = (await response.json()) as { error: string }

      throw new ApiError(response.status, text.error)
    }

    const data: unknown = await response.json()

    return data
  }
}

export default new MinecraftAPIService()
