import { observer } from 'mobx-react-lite'
import Router from '@/app/routing'
import { MainProvider } from '@/app/context/MainContext'
import { RouteLoadingProvider } from '@/features/set-top-loader/LoaderProvider'
import useApp from '@/app/useApp'

import { Toaster } from 'sonner'

import './styles/index.scss'

const App = observer(() => {
  useApp()

  return (
    <RouteLoadingProvider>
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
      <Router />
    </RouteLoadingProvider>
  )
})

export default App
