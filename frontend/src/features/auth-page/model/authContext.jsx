import useAuth from './useAuth'
import { createContext } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
  const { children } = props

  const context = useAuth()

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
