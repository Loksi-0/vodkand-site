import { useContext, useEffect, useMemo, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { useNavigate } from 'react-router'

const usePayment = () => {
  const { userStore, paymentStore, uiStore } = useContext(MainContext)

  const [checkboxValue, setCheckboxValue] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isProductLoading, setIsProductLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const disabled = useMemo(
    () => (import.meta.env.VITE_DISABLE_PAYMENT === 'true' ? true : false),
    []
  )

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      if (disabled) {
        return
      }

      if (!checkboxValue) {
        return setError('Заполните выделенное поле')
      }

      const formData = {
        source: 'checkout',
        agreed: checkboxValue
      }

      setIsLoading(true)
      await userStore.agreeTerms(formData)

      const response = await paymentStore.createOrder('pass')

      navigate(response.data?.confirmation?.confirmation_url)
    } catch (e) {
      setError(e.response?.data?.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userStore.cart === 'pass' && userStore.user?.hasPass) {
      navigate('/account')
    }
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (!userStore.cart) {
          throw new Error('Корзина пуста')
        }

        setIsProductLoading(true)

        const response = await uiStore.getProduct(userStore.cart)

        setProduct(response.data)
      } catch {
        setError('Не удалось загрузить товар')
        setProduct(null)
      } finally {
        setIsProductLoading(false)
      }
    }

    getProducts()
  }, [])

  return {
    setCheckboxValue,
    error,
    setError,
    isLoading,
    isProductLoading,
    disabled,
    handleSubmit,
    product
  }
}

export default usePayment
