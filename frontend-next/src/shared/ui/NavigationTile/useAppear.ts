'use client'

import { useState, useEffect } from 'react'

const useAppear = () => {
  const [isAppeared, setIsAppeared] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const bottomBorder =
        document.documentElement.scrollHeight - window.innerHeight - 250

      setIsAppeared(window.scrollY > 50 && window.scrollY < bottomBorder)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { isAppeared }
}

export default useAppear
