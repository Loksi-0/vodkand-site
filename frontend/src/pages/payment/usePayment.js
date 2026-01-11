import { useContext, useState } from 'react'
import { Context } from '@/main'
import { useNavigate } from 'react-router'

const usePayment = () => {
  const { userStore, paymentStore } = useContext(Context)

  const [checkboxValue, setCheckboxValue] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled] = useState(
    import.meta.env.VITE_DISABLE_PAYMENT === 'true' ? true : false
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

      setLoading(true)
      await userStore.agreeTerms(formData)

      const response = await paymentStore.createOrder('pass')

      navigate(response.data?.confirmation?.confirmation_url)
    } catch (e) {
      setError(e.response?.data?.message)
    }
  }

  return {
    setCheckboxValue,
    error,
    setError,
    loading,
    disabled,
    handleSubmit
  }
}

export default usePayment
