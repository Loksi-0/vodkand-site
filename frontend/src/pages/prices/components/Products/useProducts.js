import { Context } from '@/main'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const useProducts = () => {
  const { userStore, uiStore } = useContext(Context)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([{}])

  const onClick = (product) => {
    userStore.setCart(product.name)

    navigate('/payment')
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)

      const response = await uiStore.getProducts()

      setProducts(response.data)
      setLoading(false)
    }

    getProducts()
  }, [])

  return { products, loading, onClick }
}

export default useProducts
