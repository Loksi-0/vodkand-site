import { MainContext } from '@/app/context/MainContext'
import useDate from '@/shared/hooks/useDate'
import { useState, useEffect, useContext, useMemo } from 'react'
import { toast } from 'sonner'

const usePunishments = () => {
  const { userStore } = useContext(MainContext)

  const [isLoading, setIsLoading] = useState(false)
  const [punishments, setPunishments] = useState([])
  const isPoshalko = useMemo(() => Math.random(Date.now()) < 0.01, [])

  const date = useDate

  useEffect(() => {
    setIsLoading(true)

    const getPunishments = async () => {
      try {
        const response = await userStore.getPunishments(
          userStore.user?.nickname
        )

        setIsLoading(false)
        setPunishments(response.data)
      } catch (e) {
        toast.error(e.response?.data?.message ?? e.message)
      }
    }

    getPunishments()
  }, [])

  return {
    isLoading,
    punishments,
    isPoshalko,
    date
  }
}

export default usePunishments
