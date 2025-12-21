import { createContext, useContext, useState, useRef } from 'react'

const RouteLoadingContext = createContext(null)

export const RouteLoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const timeoutRef = useRef(null)

    const startLoading = () => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setLoading(true)
        }, 300)
    }

    const stopLoading = () => {
        clearTimeout(timeoutRef.current)
        setLoading(false)
    }

    return (
        <RouteLoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
            {children}
        </RouteLoadingContext.Provider>
    )
}

export const useRouteLoading = () => useContext(RouteLoadingContext)