import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app'
import { MainProvider } from '@/app/context/MainContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </StrictMode>
)
