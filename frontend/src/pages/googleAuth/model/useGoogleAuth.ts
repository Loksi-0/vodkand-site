import { useEffect, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { useLocation, useNavigate } from 'react-router'
import useCustomContext from '@/shared/hooks/useCustomContext'
import axios from 'axios'

const useGoogleAuth = () => {
  const { userStore } = useCustomContext(MainContext)

  const location = useLocation()
  const navigate = useNavigate()

  const [error, setError] = useState('')

  useEffect(() => {
    const auth = async () => {
      const query = new URLSearchParams(location.search)
      const tempCode = query.get('code')
      const error = query.get('error')

      if (error) {
        const isAccessDenied = error === 'access_denied'
        setError(
          isAccessDenied
            ? 'Вы отменили вход через Google'
            : `Не удалось выполнить вход с Google. ${error}`
        )
        return
      }

      try {
        if (!tempCode) {
          return
        }

        await userStore.googleAuth(tempCode)

        void navigate('/account')
      } catch (e) {
        if (axios.isAxiosError<ApiError>(e)) {
          setError(String(e.response?.data.message))
        }
      }
    }

    void auth()
  }, [])

  return { error }
}

export default useGoogleAuth
