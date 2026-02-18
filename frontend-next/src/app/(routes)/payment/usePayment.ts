'use client'

import { useEffect, useMemo, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { useRouter } from 'next/navigation'
import useCustomContext from '@/shared/hooks/useCustomContext'
import React from 'react'
import axios from 'axios'

const usePayment = () => {
  type ProductType = {
    name: string
    value: string
    description: string
    disclaimer: string
    image: string
  }

  const { userStore, paymentStore, uiStore } = useCustomContext(MainContext)

  const [checkboxValue, setCheckboxValue] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isProductLoading, setIsProductLoading] = useState(false)
  const [product, setProduct] = useState<ProductType | null>(null)
  const disabled = useMemo(
    () => Boolean(process.env.NEXT_PUBLIC_DISABLE_PAYMENT),
    []
  )

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      if (disabled) {
        return
      }

      if (!checkboxValue) {
        setError('Заполните выделенное поле')
        return
      }

      const formData = {
        source: 'checkout',
        agreed: checkboxValue
      }

      setIsLoading(true)
      await userStore.agreeTerms(formData)

      const response = await paymentStore.createOrder('pass')

      router.push(response.data.confirmation.confirmation_url)
    } catch (e) {
      if (axios.isAxiosError<ApiError>(e)) {
        setError(String(e.response?.data.message))
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userStore.cart === 'pass' && userStore.user?.hasPass) {
      router.push('/account')
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

    void getProducts()
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
