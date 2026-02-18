import { observer } from 'mobx-react-lite'
import { LoaderProvider } from '@/features/set-top-loader/context/LoaderContext'
import useApp from '@/app/useApp'

import { Toaster } from 'sonner'

import './styles/index.scss'
import Router from './routing'

const App = observer(() => {
  useApp()

  return (
    <LoaderProvider>
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
    </LoaderProvider>
  )
})

export default App
