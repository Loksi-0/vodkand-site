import { useContext, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { toast } from 'sonner'

const useWhitelist = () => {
  const { userStore } = useContext(MainContext)

  const [isLoading, setIsLoading] = useState(false)
  const [nick, setNick] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      if (nick.length === 0) {
        return setError('Заполните поле')
      }

      setIsLoading(true)

      await userStore.changeNickname(nick)

      setIsLoading(false)
      window.location.href = '/'
    } catch (e) {
      setIsLoading(false)
      setError(e.response?.data?.message)
    }
  }

  const onChange = (event) => {
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
