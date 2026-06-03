'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import axios from 'axios'

const useAccount = () => {
  const { userStore } = useCustomContext(MainContext)

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)

      await userStore.logout()

      setIsLoading(false)
    } catch (e) {
      if (axios.isAxiosError<ApiError>(e)) {
        toast.error(e.response?.data.message ?? e.message)
      }
    }
  }

  const handleSendMail = useCallback(() => {
    if (userStore.user?.email) {
      void userStore.sendMail(userStore.user.email)
    }
  }, [userStore])

  const handleBuyPass = useCallback(() => {
    router.push('/payment')
  }, [userStore])

  const handleAddNick = useCallback(() => {
    router.push('/whitelist')
  }, [userStore])

  return {
    handleLogout,
    handleSendMail,
    handleBuyPass,
    handleAddNick,
    isLoading
  }
}

export default useAccount
