'use client'

import mute from '@/shared/assets/icons/mute.png'
import warn from '@/shared/assets/icons/warn.png'
import ban from '@/shared/assets/icons/ban.png'

import { useState, useEffect } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { toast } from 'sonner'
import useCustomContext from '@/shared/hooks/useCustomContext'
import axios from 'axios'
import type { StaticImageData } from 'next/image'

const useAlert = () => {
  type PunishmentType = {
    type: 'WARN' | 'BAN' | 'MUTE'
    icon: StaticImageData
    title: string
    reason: string
    endDate: number
  }

  const { userStore } = useCustomContext(MainContext)
  const [punishment, setPunishment] = useState<PunishmentType | null>(null)

  useEffect(() => {
    const getPunishments = async () => {
      try {
        if (!userStore.user?.nickname) {
          return
        }

        const response = await userStore.getPunishments(userStore.user.nickname)

        if (!response.data[0]) {
          return
        }

        const punishmentType = response.data[0].type

        if (punishmentType === 'WARN') {
          setPunishment({
            icon: warn,
            title: 'Предупреждение',
            ...response.data[0]
          })

          return
        }
        if (punishmentType === 'BAN') {
          setPunishment({
            icon: ban,
            title: 'Бан',
            ...response.data[0]
          })

          return
        }

        setPunishment({
          icon: mute,
          title: 'Мут',
          ...response.data[0]
        })

        return
      } catch (e) {
        if (axios.isAxiosError<ApiError>(e)) {
          toast.error(e.response?.data.message ?? e.message)
        }
      }
    }

    void getPunishments()
  }, [userStore.user?.nickname])

  return { punishment }
}

export default useAlert
