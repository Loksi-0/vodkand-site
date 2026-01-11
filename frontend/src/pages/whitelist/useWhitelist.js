import { useContext, useState } from 'react'
import { Context } from '@/main'
import { toast } from 'sonner'

const useWhitelist = () => {
  const { userStore } = useContext(Context)

  const [loading, setLoading] = useState(false)
  const [nick, setNick] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      if (nick.length === 0) {
        return setError('Заполните поле')
      }

      setLoading(true)

      await userStore.changeNickname(nick)

      setLoading(false)
      window.location.href = '/'
    } catch (e) {
      setLoading(false)
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
    loading,
    nick,
    error,
    handleSubmit,
    onChange
  }
}

export default useWhitelist
