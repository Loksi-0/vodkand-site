import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import { Toaster } from 'sonner'

import UserStore from './api/store/userStore'
import UIStore from '@/api/store/uiStore'
import PaymentStore from '@/api/store/paymentStore'
import WikiStore from '@/api/store/wikiStore'

import '@/styles/normalise.scss'
import '@/styles/fonts.scss'
import '@/styles/variables.scss'
import '@/styles/globals.scss'
import '@/styles/utils.scss'
import '@/styles/toaster.scss'
import { RouteLoadingProvider } from './global-components/TopLoader/LoaderProvider'

const userStore = new UserStore()
const uiStore = new UIStore()
const paymentStore = new PaymentStore()
const wikiStore = new WikiStore()

export const Context = createContext({
  userStore,
  uiStore,
  paymentStore,
  wikiStore
})

createRoot(document.getElementById('root')).render(
  <RouteLoadingProvider>
    <Context.Provider
      value={{
        userStore,
        uiStore,
        paymentStore,
        wikiStore
      }}
    >
      <StrictMode>
        <Toaster
          richColors
          position='top-center'
          toastOptions={{
            classNames: {
              toast: 'toast',
              title: 'title',
              description: 'description'
            }
          }}
        />
        <App />
      </StrictMode>
    </Context.Provider>
  </RouteLoadingProvider>
)
