'use client'

import { ChangeEventHandler, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { toast } from 'sonner'
import useCustomContext from '@/shared/hooks/useCustomContext'
import React from 'react'
import axios from 'axios'

const useWhitelist = () => {
  const { userStore } = useCustomContext(MainContext)

  const [isLoading, setIsLoading] = useState(false)
  const [nick, setNick] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      if (nick.length === 0) {
        setError('Заполните поле')
        return
      }

      setIsLoading(true)

      await userStore.changeNickname(nick)

      setIsLoading(false)
      window.location.href = '/'
    } catch (e) {
      setIsLoading(false)

      if (axios.isAxiosError<ApiError>(e)) {
        setError(String(e.response?.data.message))
      }
    }
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const expression = /[^a-zA-Z0-9_]/g
    const value = event.target.value

    if (expression.test(value)) {
      toast.error('Разрешены только английские буквы, цифры и символ _')
    }

    setNick(value.trim().replace(expression, ''))
    setError('')
  }

  return {
    isLoading,
    nick,
    error,
    handleSubmit,
    onChange
  }
}

export default useWhitelist
