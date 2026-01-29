import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const useProducts = () => {
  type ProductType = {
    name: string
    value: string
    valueOld: string
    title: string
    image: string
    buttonText: string
  }

  const { userStore, uiStore } = useCustomContext(MainContext)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])

  const onClick = (product: ProductType) => {
    userStore.setCart(product.name)

    void navigate('/payment')
  }

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)

      const response = await uiStore.getProducts()

      setProducts(response.data)
      setIsLoading(false)
    }

    void getProducts()
  }, [])

  return { products, isLoading, onClick }
}

export default useProducts
