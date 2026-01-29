import axios from 'axios'
import { setAccessToken } from '@/shared/api/TokenManager'

type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

let refreshPromise: Promise<unknown> | null = null
let isRefreshingFailed: boolean = false

export function refreshToken() {
  if (isRefreshingFailed) {
    return Promise.reject(new Error('Session expired'))
  }

  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = refreshApi
    .get<RefreshResponse>('/refresh')
    .then((res) => {
      setAccessToken(res.data.accessToken)
      return res.data.accessToken
    })
    .catch((err: unknown) => {
      isRefreshingFailed = true
      throw err
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}
