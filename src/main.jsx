import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from '@/pages/index/Index.jsx'
import Plugins from '@/pages/plugins/Plugins'
import Account from './pages/account/Account'
import { BrowserRouter, Routes, Route } from "react-router"

import { Toaster } from "sonner"

import '@/styles/normalise.scss'
import '@/styles/fonts.scss'
import '@/styles/variables.scss'
import '@/styles/globals.scss'
import '@/styles/utils.scss'
import '@/styles/toaster.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster 
      richColors 
      position='bottom-center'
      toastOptions={{
        classNames: {
          toast: 'toast',
          title: 'title',
          description: 'description'
        }
      }}
    />

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/plugins' element={<Plugins />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
