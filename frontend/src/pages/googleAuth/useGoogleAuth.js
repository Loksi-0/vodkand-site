import { useContext, useEffect, useState } from 'react'
import { Context } from '@/main'
import { useLocation, useNavigate } from 'react-router'

const useGoogleAuth = () => {
  const { userStore } = useContext(Context)

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
        await userStore.googleAuth(tempCode)

        navigate('/account')
      } catch (e) {
        setError(e.response?.data?.message)
      }
    }

    auth()
  }, [])

  return { error }
}

export default useGoogleAuth
