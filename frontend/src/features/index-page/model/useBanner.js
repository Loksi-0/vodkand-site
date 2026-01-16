import { MainContext } from '@/app/context/MainContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const useBanner = () => {
  const { uiStore, userStore } = useContext(MainContext)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState(null)

  const onClick = () => {
    userStore.setCart('pass')

    navigate('/payment')
  }

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true)

      const response = await uiStore.getProduct('pass')

      setPrice(response.data?.value.split('.')[0])
      setIsLoading(false)
    }

    getProduct()
  }, [])

  return {
    isLoading,
    price,
    onClick
  }
}

export default useBanner
