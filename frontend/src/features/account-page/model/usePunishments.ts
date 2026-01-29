import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import useDate from '@/shared/hooks/useDate'
import axios from 'axios'
import mute from '@/shared/assets/icons/mute.png'
import warn from '@/shared/assets/icons/warn.png'
import ban from '@/shared/assets/icons/ban.png'
import { useState, useEffect, useMemo } from 'react'
import { toast } from 'sonner'

type PunishmentsElementType = {
  type: 'WARN' | 'BAN' | 'MUTE'
  endDate: number
  reason: string
}

const usePunishments = () => {
  const { userStore } = useCustomContext(MainContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [punishments, setPunishments] = useState<PunishmentsElementType[]>([])
  const isPoshalko = useMemo(() => Math.random() < 0.01, [])

  const date = useDate

  const icons: Record<'BAN' | 'WARN' | 'MUTE', string> = {
    BAN: ban,
    WARN: warn,
    MUTE: mute
  }

  const titles: Record<'BAN' | 'WARN' | 'MUTE', string> = {
    BAN: 'Бан',
    WARN: 'Предупреждение',
    MUTE: 'Мут'
  }

  useEffect(() => {
    setIsLoading(true)

    const getPunishments = async () => {
      try {
        if (!userStore.user?.nickname) {
          return
        }

        const response = await userStore.getPunishments(userStore.user.nickname)

        setIsLoading(false)
        setPunishments(response.data)
      } catch (e) {
        if (axios.isAxiosError<ApiError>(e)) {
          toast.error(e.response?.data.message ?? e.message)
        }
      }
    }

    void getPunishments()
  }, [])

  return {
    isLoading,
    punishments,
    isPoshalko,
    date,
    icons,
    titles
  }
}

export default usePunishments
