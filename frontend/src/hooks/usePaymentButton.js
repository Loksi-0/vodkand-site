import { Context } from '@/main'
import { useContext } from 'react'

const usePaymentButton = () => {
  const { userStore } = useContext(Context)

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
