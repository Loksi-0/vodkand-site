import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { getAccessToken } from '@/shared/api/TokenManager'
import { refreshToken } from '@/shared/api/refreshToken'

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
})

api.interceptors.request.use((config) => {
  if (getAccessToken()) {
    config.headers.Authorization = `Bearer ${String(getAccessToken())}`
  }

  return config
})

api.interceptors.response.use(
  (config) => config,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _isRetry: boolean
    }

    if (originalRequest.url && originalRequest.url.includes('/refresh')) {
      throw error
    }

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true

      try {
        const newAccessToken = await refreshToken()

        originalRequest.headers.Authorization = `Bearer ${String(newAccessToken)}`

        return await api.request(originalRequest)
      } catch {
        throw error
      }
    }

    throw error
  }
)

export default api
