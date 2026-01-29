import ApiError from '../exceptions/ApiError.js'

class MinecraftAPIService {
  async getPlayerPunishments(username) {
    const response = await fetch(
      `${process.env.MINECRAFT_API_URL}/v1/libertybans/all?username=${encodeURIComponent(username)}`,
      {
        headers: {
          Authorization: process.env.MINECRAFT_API_KEY,
          Accept: 'application/json'
        }
      }
    )

    if (!response.ok) {
      const json = await response.json()
      throw ApiError.InternalError(json)
    }

    const data = await response.json()

    return data
  }

  async getWhitelist() {
    const response = await fetch(
      `${process.env.MINECRAFT_API_URL}/v1/whitelist`,
      {
        headers: {
          Authorization: process.env.MINECRAFT_API_KEY,
          Accept: 'application/json'
        }
      }
    )

    if (!response.ok) {
      const json = await response.json()
      res.status(response.status).json(json)
    }

    const data = await response.json()

    return data
  }

  async postWhitelist(nickname) {
    const response = await fetch(
      `${process.env.MINECRAFT_API_URL}/v1/whitelist?username=${nickname}`,
      {
        method: 'POST',
        headers: {
          Authorization: process.env.MINECRAFT_API_KEY,
          Accept: 'application/json'
        }
      }
    )

    if (!response.ok) {
      const text = await response.json()

      throw new ApiError(response.status, text.error)
    }

    const data = await response.json()

    return data
  }
}

export default new MinecraftAPIService()
