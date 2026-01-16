import useWiki from './useWiki'
import { createContext } from 'react'

export const WikiContext = createContext({})

export const WikiProvider = (props) => {
  const { children } = props

  const context = useWiki(props)

  return <WikiContext.Provider value={context}>{children}</WikiContext.Provider>
}
