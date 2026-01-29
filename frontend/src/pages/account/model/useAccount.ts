import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import axios from 'axios'

const useAccount = () => {
  const { userStore } = useCustomContext(MainContext)

  const navigate = useNavigate()
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
    void navigate('/payment')
  }, [userStore])

  const handleAddNick = useCallback(() => {
    void navigate('/whitelist')
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
