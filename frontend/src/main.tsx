import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app'
import { MainProvider } from '@/app/context/MainContext'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </StrictMode>
)
