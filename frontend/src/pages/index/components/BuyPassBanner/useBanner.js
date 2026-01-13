import { Context } from '@/main'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const useBanner = () => {
  const { uiStore, userStore } = useContext(Context)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(null)

  const onClick = () => {
    userStore.setCart('pass')

    navigate('/payment')
  }

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)

      const response = await uiStore.getProduct('pass')

      setPrice(response.data?.value.split('.')[0])
      setLoading(false)
    }

    getProduct()
  }, [])

  return {
    loading,
    price,
    onClick
  }
}

export default useBanner
