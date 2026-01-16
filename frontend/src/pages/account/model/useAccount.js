import { useState, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { MainContext } from '@/app/context/MainContext'

const useAccount = () => {
  const { userStore } = useContext(MainContext)

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)

      await userStore.logout()

      setIsLoading(false)
    } catch (e) {
      toast.error(e.response?.data?.message ?? e.message)
    }
  }

  const handleSendMail = useCallback(() => {
    if (userStore.user?.email) {
      userStore.sendMail(userStore.user.email)
    }
  }, [userStore])

  const handleBuyPass = useCallback(() => {
    navigate('/payment')
  }, [userStore])

  const handleAddNick = useCallback(() => {
    navigate('/whitelist')
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
