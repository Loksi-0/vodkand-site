'use client'

import { useState, useRef } from 'react'

const useLoaderContext = () => {
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startLoading = () => {
    if (!timeoutRef.current) {
      return
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsLoading(true)
    }, 300)
  }

  const stopLoading = () => {
    if (!timeoutRef.current) {
      return
    }

    clearTimeout(timeoutRef.current)
    setIsLoading(false)
  }

  return {
    isLoading,
    startLoading,
    stopLoading
  }
}

export type LoaderContextValue = ReturnType<typeof useLoaderContext>

export default useLoaderContext
