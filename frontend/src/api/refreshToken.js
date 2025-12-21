import axios from 'axios'
import { setAccessToken } from './TokenManager'

const refreshApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

let refreshPromise = null
let isRefreshingFailed = false

export function refreshToken() {
    if (isRefreshingFailed) {
        return Promise.reject(new Error('Session expired'))
    }

    if (refreshPromise) {
        return refreshPromise
    }

    refreshPromise = refreshApi.get('/refresh')
    .then(res => {
        setAccessToken(res.data.accessToken)
        return res.data.accessToken
    })
    .catch(err => {
        isRefreshingFailed = true
        throw err
    })
    .finally(() => {
        refreshPromise = null
    })

    return refreshPromise
}