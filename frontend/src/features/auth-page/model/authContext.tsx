import useAuth, { AuthContextValue } from './useAuth'
import { createContext, PropsWithChildren } from 'react'

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props

  const context = useAuth()

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
