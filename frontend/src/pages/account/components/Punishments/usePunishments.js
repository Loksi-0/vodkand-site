import { useState, useEffect, useContext } from 'react'
import { Context } from '@/main'
import useDate from '@/hooks/useDate'
import { toast } from 'sonner'

const usePunishments = () => {
  const { userStore } = useContext(Context)

  const [loading, setLoading] = useState(false)
  const [punishments, setPunishments] = useState([])
  const [isPoshalko] = useState(Math.random(Date.now()) < 0.01)

  const date = useDate

  useEffect(() => {
    setLoading(true)

    const getPunishments = async () => {
      try {
        const response = await userStore.getPunishments(
          userStore.user?.nickname
        )

        setLoading(false)
        setPunishments(response.data)
      } catch (e) {
        toast.error(e.response?.data?.message ?? e.message)
      }
    }

    getPunishments()
  }, [])

  return {
    loading,
    punishments,
    isPoshalko,
    date
  }
}

export default usePunishments
