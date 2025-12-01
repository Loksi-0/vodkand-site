import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from '@/pages/index/Index.jsx'
import Plugins from '@/pages/plugins/Plugins'
import Account from '@/pages/account/Account'
import Terms from '@/pages/terms/Terms'
import Rules from './pages/rules/Rules'
import Prices from './pages/prices/Prices'
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
        <Route path='/terms' element={<Terms />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/prices' element={<Prices />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
