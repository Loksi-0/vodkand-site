import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { MainContext } from '@/app/context/MainContext'

const useAuthApi = ({ onError, onStart, onFinish, onSuccessRegistration }) => {
  const navigate = useNavigate()
  const { userStore } = useContext(MainContext)

  const login = async (email, password) => {
    try {
      await userStore.login(email, password)

      navigate('/account', { replace: true })
    } catch (e) {
      onError?.(e.response?.data?.message)
    } finally {
      onFinish?.()
    }
  }

  const registration = async (email, password) => {
    try {
      await userStore.registration(email, password)

      onSuccessRegistration?.()
    } catch (e) {
      onError?.(e.response?.data?.message)
    } finally {
      onFinish?.()
    }
  }

  const auth = async (email, password) => {
    onStart?.()

    try {
      const response = await userStore.hasUser(email)

      if (response.data) {
        login(email, password)
      } else {
        registration(email, password)
      }
    } catch {
      onError?.('Непредвиденная ошибка')
    }
  }

  return auth
}

export default useAuthApi
