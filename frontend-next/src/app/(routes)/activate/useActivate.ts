'use client'

import { useEffect, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

const useActivate = () => {
  type StatusType = 'pending' | 'ok' | 'error'

  const searchParams = useSearchParams()

  const { userStore } = useCustomContext(MainContext)

  const [title, setTitle] = useState('Выполняется активация...')
  const [status, setStatus] = useState<StatusType>('pending')

  useEffect(() => {
    const activate = async () => {
      try {
        const activationLink = searchParams.get('link')

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
