import UserStore from '@/shared/api/store/userStore'
import UIStore from '@/shared/api/store/uiStore'
import PaymentStore from '@/shared/api/store/paymentStore'
import WikiStore from '@/shared/api/store/wikiStore'

const useMainContext = () => {
  const userStore = new UserStore()
  const uiStore = new UIStore()
  const paymentStore = new PaymentStore()
  const wikiStore = new WikiStore()

  return {
    userStore,
    uiStore,
    paymentStore,
    wikiStore
  }
}

export default useMainContext
