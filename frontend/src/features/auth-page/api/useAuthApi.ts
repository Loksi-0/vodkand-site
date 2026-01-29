import { useNavigate } from 'react-router'
import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

type AuthApiType = {
  onError: Dispatch<SetStateAction<string>>
  onStart: () => void
  onFinish: () => void
  onSuccessRegistration: () => void
}

const useAuthApi = ({
  onError,
  onStart,
  onFinish,
  onSuccessRegistration
}: AuthApiType) => {
  const navigate = useNavigate()
  const { userStore } = useCustomContext(MainContext)

  const login = async (email: string, password: string) => {
    try {
      await userStore.login(email, password)

      void navigate('/account', { replace: true })
    } catch (e) {
      if (axios.isAxiosError<ApiError>(e)) {
        onError(String(e.response?.data.message))
      }
    } finally {
      onFinish()
    }
  }

  const registration = async (email: string, password: string) => {
    try {
      await userStore.registration(email, password)

      onSuccessRegistration()
    } catch (e) {
      if (axios.isAxiosError<ApiError>(e)) {
        onError(String(e.response?.data.message))
      }
    } finally {
      onFinish()
    }
  }

  const auth = async (email: string, password: string) => {
    onStart()

    try {
      const response = await userStore.hasUser(email)

      if (response.data) {
        void login(email, password)
      } else {
        void registration(email, password)
      }
    } catch {
      onError('Непредвиденная ошибка')
    }
  }

  return auth
}

export default useAuthApi
