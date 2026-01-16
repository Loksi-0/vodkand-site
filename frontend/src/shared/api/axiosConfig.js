import axios from 'axios'
import { getAccessToken } from '@/shared/api/TokenManager'
import { refreshToken } from '@/shared/api/refreshToken'

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

api.interceptors.request.use((config) => {
  if (getAccessToken()) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`
  }

  return config
})

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (originalRequest.url.includes('/refresh')) {
      throw error
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        const newAccessToken = await refreshToken()

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api.request(originalRequest)
      } catch {
        throw error
      }
    }

    throw error
  }
)

export default api
