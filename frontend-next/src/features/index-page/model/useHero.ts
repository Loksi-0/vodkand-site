'use client'

import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const useHero = () => {
  const { userStore } = useCustomContext(MainContext)

  const router = useRouter()

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 767 : false
  )

  const onClick = () => {
    userStore.setCart('pass')

    router.push('/payment')
  }

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 767)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return { isMobile, onClick, loading: userStore.isLoading }
}

export default useHero
