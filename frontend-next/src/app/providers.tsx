'use client'

import { MainProvider } from '@/app/context/MainContext'
import { LoaderProvider } from '@/features/set-top-loader/context/LoaderContext'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <MainProvider>
      <LoaderProvider>
        {children}
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
      </LoaderProvider>
    </MainProvider>
  )
}

export default Providers
