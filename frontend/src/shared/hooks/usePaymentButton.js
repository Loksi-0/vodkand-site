import { MainContext } from '@/app/context/MainContext'
import { useContext } from 'react'

const usePaymentButton = () => {
  const { userStore } = useContext(MainContext)

  if (!userStore.isAuth) {
    return '/auth'
  }
  if (!userStore.user?.isActivated) {
    return '/account'
  }
  if (!userStore.user?.hasPass) {
    return '/payment'
  }
  if (!userStore.user?.nickname) {
    return '/whitelist'
  }
  if (userStore.user?.nickname) {
    return '/account'
  }

  return
}

export default usePaymentButton
