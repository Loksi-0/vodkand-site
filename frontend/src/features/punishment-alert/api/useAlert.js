import mute from '@/shared/assets/icons/mute.png'
import warn from '@/shared/assets/icons/warn.png'
import ban from '@/shared/assets/icons/ban.png'

import { useState, useContext, useEffect } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { toast } from 'sonner'

const useAlert = () => {
  const { userStore } = useContext(MainContext)
  const [punishment, setPunishment] = useState(null)

  useEffect(() => {
    if (!userStore.user?.nickname) {
      return
    }

    const getPunishments = async () => {
      try {
        const response = await userStore.getPunishments(
          userStore.user?.nickname
        )

        if (!response.data[0]) {
          return
        }

        const punishmentType = response.data[0].type

        if (punishmentType === 'WARN') {
          return setPunishment({
            icon: warn,
            title: 'Предупреждение',
            ...response.data[0]
          })
        }
        if (punishmentType === 'BAN') {
          return setPunishment({
            icon: ban,
            title: 'Бан',
            ...response.data[0]
          })
        }
        if (punishmentType === 'MUTE') {
          return setPunishment({
            icon: mute,
            title: 'Мут',
            ...response.data[0]
          })
        }
      } catch (e) {
        toast.error(e.response?.data?.message ?? e.message)
      }
    }

    getPunishments()
  }, [userStore.user?.nickname])

  return { punishment }
}

export default useAlert
