import useMainContext, { MainContextValue } from '@/app/context/useMainContext'
import { createContext, PropsWithChildren } from 'react'

export const MainContext = createContext<MainContextValue | null>(null)

export const MainProvider = (props: PropsWithChildren) => {
  const { children } = props

  const context = useMainContext()

  return <MainContext.Provider value={context}>{children}</MainContext.Provider>
}
