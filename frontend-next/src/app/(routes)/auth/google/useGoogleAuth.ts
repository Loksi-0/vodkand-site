'use client'

import { useEffect, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'

import useCustomContext from '@/shared/hooks/useCustomContext'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

const useGoogleAuth = () => {
  const { userStore } = useCustomContext(MainContext)

  const searchParams = useSearchParams()
  const router = useRouter()

  const [error, setError] = useState('')

  useEffect(() => {
    const auth = async () => {
      try {
        const tempCode = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
          const isAccessDenied = error === 'access_denied'
          setError(
            isAccessDenied
              ? 'Вы отменили вход через Google'
              : `Не удалось выполнить вход с Google. ${error}`
          )
          return
        }
        if (!tempCode) {
          return
        }

        await userStore.googleAuth(tempCode)

        router.push('/account')
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
