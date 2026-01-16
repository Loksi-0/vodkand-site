import { MainContext } from '@/app/context/MainContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const useProducts = () => {
  const { userStore, uiStore } = useContext(MainContext)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([{}])

  const onClick = (product) => {
    userStore.setCart(product.name)

    navigate('/payment')
  }

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)

      const response = await uiStore.getProducts()

      setProducts(response.data)
      setIsLoading(false)
    }

    getProducts()
  }, [])

  return { products, isLoading, onClick }
}

export default useProducts
