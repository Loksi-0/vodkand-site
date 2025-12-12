import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import { Toaster } from "sonner"
import Store from './api/store'

import '@/styles/normalise.scss'
import '@/styles/fonts.scss'
import '@/styles/variables.scss'
import '@/styles/globals.scss'
import '@/styles/utils.scss'
import '@/styles/toaster.scss'

const store = new Store()

export const Context = createContext({ store })

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    store
  }}>
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
)
