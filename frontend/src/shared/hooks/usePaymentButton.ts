import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'

const usePaymentButton = () => {
  const { userStore } = useCustomContext(MainContext)

  if (!userStore.isAuth) {
    return '/auth'
  }
  if (!userStore.user?.isActivated) {
    return '/account'
  }
  if (!userStore.user.hasPass) {
    return '/payment'
  }
  if (!userStore.user.nickname) {
    return '/whitelist'
  }
  if (userStore.user.nickname) {
    return '/account'
  }

  return
}

export default usePaymentButton
