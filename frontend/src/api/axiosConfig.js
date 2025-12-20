import axios from 'axios'
import { getAccessToken, setAccessToken } from './TokenManager'
import { refreshToken } from './refreshToken'

const api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000
})

let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token) {
  refreshSubscribers.forEach(cb => cb(token))
  refreshSubscribers = []
}

api.interceptors.request.use(config => {
    if (getAccessToken()) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`
    }

    return config
})

api.interceptors.response.use(config => config, async error => {
    const originalRequest = error.config

    if (
        error.response.status === 401 
        && error.config 
        && !error.config._isRetry
        && !originalRequest.url.includes('/refresh')
    ) {
        originalRequest._isRetry = true

        if (isRefreshing) {
            return new Promise(resolve => {
                subscribeTokenRefresh(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    resolve(api(originalRequest))
                })
            })
        }

        isRefreshing = true

        try {
            const response = await refreshToken()

            setAccessToken(response.data.accessToken)
            onRefreshed(response.data.accessToken)

            if (getAccessToken()) {
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
            }

            return api.request(originalRequest)
        } catch(e) {
            console.log('Не авторизован')
            throw e
        } finally {
            isRefreshing = false
        }
    }

    throw error
})

export default api