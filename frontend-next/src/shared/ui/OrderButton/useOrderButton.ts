'use client'

import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { useRouter } from 'next/navigation'

const useOrderButton = (product: string) => {
  const { userStore } = useCustomContext(MainContext)

  const router = useRouter()

  const onClick = () => {
    userStore.setCart(product)

    router.push('/payment')
  }

  return { onClick, isLoading: userStore.isLoading }
}

export default useOrderButton
