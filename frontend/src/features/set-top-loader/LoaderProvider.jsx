import { createContext, useContext, useState, useRef } from 'react'

const RouteLoadingContext = createContext(null)

export const RouteLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef(null)

  const startLoading = () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsLoading(true)
    }, 300)
  }

  const stopLoading = () => {
    clearTimeout(timeoutRef.current)
    setIsLoading(false)
  }

  return (
    <RouteLoadingContext.Provider
      value={{ isLoading, startLoading, stopLoading }}
    >
      {children}
    </RouteLoadingContext.Provider>
  )
}

export const useRouteLoading = () => useContext(RouteLoadingContext)
