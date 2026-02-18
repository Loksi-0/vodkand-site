import { useEffect, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { useLocation } from 'react-router'
import useCustomContext from '@/shared/hooks/useCustomContext'
import axios from 'axios'

const useActivate = () => {
  type StatusType = 'pending' | 'ok' | 'error'

  const location = useLocation()

  const { userStore } = useCustomContext(MainContext)

  const [title, setTitle] = useState('Выполняется активация...')
  const [status, setStatus] = useState<StatusType>('pending')

  useEffect(() => {
    const activate = async () => {
      try {
        const activationLink = new URLSearchParams(location.search).get('link')

        if (!activationLink) {
          throw new Error('Ссылка активации отсутствует')
        }

        await userStore.activate(activationLink)

        localStorage.setItem('isActivated', 'true')
        setTitle('Активация прошла успешно')
        setStatus('ok')
      } catch (e) {
        if (axios.isAxiosError<ApiError>(e)) {
          setTitle(e.response?.data.message ?? e.message)
        }

        setStatus('error')
      }
    }

    void activate()
  }, [])

  return {
    title,
    status
  }
}

export default useActivate
