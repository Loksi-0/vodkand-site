import useValidate from '@/hooks/useValidate'
import useAuthApi from '@/context/AuthContext/useAuthApi'
import { useEffect, useState } from 'react'

const useAuth = () => {
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalidFields, setInvalidFields] = useState([])
  const [error, setError] = useState('')
  const [isActivated, setIsActivated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { validateEmail, validatePassword } = useValidate()

  const auth = useAuthApi({
    onError: setError,
    onStart: () => setIsLoading(true),
    onFinish: () => setIsLoading(false),
    onSuccessRegistration: () => {
      localStorage.setItem('isActivated', 'pending')
      setPage(2)
    }
  })

  useEffect(() => {
    const onStorage = () => {
      const item = localStorage.getItem('isActivated')

      if (item) {
        setIsActivated(true)
      }
    }

    window.addEventListener('storage', onStorage)

    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    if (!isActivated) {
      return
    }

    window.location.replace('/account')
  }, [isActivated])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const normalizedEmail = email.trim()
    const normalizedPassword = password.trim()

    setEmail(normalizedEmail)
    setPassword(normalizedPassword)

    const emailValidation = validateEmail(normalizedEmail)
    const passwordValidation = validatePassword(normalizedPassword)

    if (emailValidation.empty && passwordValidation.empty) {
      setError('Заполните выделенные поля')
      setInvalidFields(['email', 'password'])
      setIsLoading(false)

      return
    }

    if (!emailValidation.valid) {
      setError(emailValidation.message)
      setInvalidFields(['email'])
      setIsLoading(false)

      return
    }

    if (!passwordValidation.valid) {
      setError(passwordValidation.message)
      setInvalidFields(['password'])
      setIsLoading(false)

      return
    }

    setInvalidFields([])
    setError('')

    auth(email, password)
  }

  return {
    page,
    setPage,
    email,
    setEmail,
    password,
    setPassword,
    invalidFields,
    setInvalidFields,
    error,
    setError,
    isActivated,
    setIsActivated,
    isLoading,
    setIsLoading,
    showPassword,
    setShowPassword,
    handleSubmit
  }
}

export default useAuth
