import useValidate from '@/shared/hooks/useValidate'
import useAuthApi from '@/features/auth-page/api/useAuthApi'
import { useEffect, useState } from 'react'
import React from 'react'

const useAuth = () => {
  type InvalidFieldType = 'email' | 'password'

  const [page, setPage] = useState<number>(1)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [invalidFields, setInvalidFields] = useState<InvalidFieldType[]>([])
  const [error, setError] = useState<string>('')
  const [isActivated, setIsActivated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { validateEmail, validatePassword } = useValidate()

  const auth = useAuthApi({
    onError: setError,
    onStart: () => {
      setIsLoading(true)
    },
    onFinish: () => {
      setIsLoading(false)
    },
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

    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  useEffect(() => {
    if (!isActivated) {
      return
    }

    window.location.replace('/account')
  }, [isActivated])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    void auth(email, password)
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

export type AuthContextValue = ReturnType<typeof useAuth>

export default useAuth
