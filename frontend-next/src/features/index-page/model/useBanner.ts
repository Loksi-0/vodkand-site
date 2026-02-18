'use client'

import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const useBanner = () => {
  const { uiStore, userStore } = useCustomContext(MainContext)

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState<number | null>(null)

  const onClick = () => {
    userStore.setCart('pass')

    router.push('/payment')
  }

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true)

      const response = await uiStore.getProduct('pass')

      setPrice(Number(response.data.value.split('.')[0]))
      setIsLoading(false)
    }

    void getProduct()
  }, [])

  return {
    isLoading,
    price,
    onClick
  }
}

export default useBanner
