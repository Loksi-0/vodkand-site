import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from '@/pages/index/Index.jsx'

import '@/styles/fonts.scss'
import '@/styles/variables.scss'
import '@/styles/globals.scss'
import '@/styles/utils.scss'
import 'normalize.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index />
  </StrictMode>,
)
