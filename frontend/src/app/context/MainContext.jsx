import useMainContext from '@/app/context/useMainContext'
import { createContext } from 'react'

export const MainContext = createContext({})

export const MainProvider = (props) => {
  const { children } = props

  const context = useMainContext()

  return <MainContext.Provider value={context}>{children}</MainContext.Provider>
}
