import useWiki, { UseWikiProps, WikiContextValue } from './useWiki'
import { createContext, PropsWithChildren } from 'react'

export const WikiContext = createContext<WikiContextValue | null>(null)

export const WikiProvider = (props: PropsWithChildren<UseWikiProps>) => {
  const { children } = props

  const context = useWiki(props)

  return <WikiContext.Provider value={context}>{children}</WikiContext.Provider>
}
