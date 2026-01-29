import useLoaderContext, {
  LoaderContextValue
} from '@/features/set-top-loader/context/useLoaderContext'
import { createContext, PropsWithChildren } from 'react'

export const LoaderContext = createContext<LoaderContextValue | null>(null)

export const LoaderProvider = (props: PropsWithChildren) => {
  const { children } = props

  const context = useLoaderContext()

  return (
    <LoaderContext.Provider value={context}>{children}</LoaderContext.Provider>
  )
}
