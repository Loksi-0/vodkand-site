import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const useBanner = () => {
  const { uiStore, userStore } = useCustomContext(MainContext)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState<number | null>(null)

  const onClick = () => {
    userStore.setCart('pass')

    void navigate('/payment')
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
