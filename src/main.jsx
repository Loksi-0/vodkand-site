import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from '@/pages/index/Index.jsx'

import { Toaster } from "sonner"

import '@/styles/normalise.scss'
import '@/styles/fonts.scss'
import '@/styles/variables.scss'
import '@/styles/globals.scss'
import '@/styles/utils.scss'
import '@/styles/toaster.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index />
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
  </StrictMode>,
)
