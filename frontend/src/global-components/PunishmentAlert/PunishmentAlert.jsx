import styles from './PunishmentAlert.module.scss'

import cx from 'clsx'

import mute from '@/assets/icons/mute.png'
import warn from '@/assets/icons/warn.png'
import ban from '@/assets/icons/ban.png'

import { useState, useContext, useEffect } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'

const PunishmentAlert = observer(() => {
  const { store } = useContext(Context)
  const [punishment, setPunishment] = useState(null)

  useEffect(() => {
    if (!store.user?.nickname) {
      return
    }

    const getPunishments = async () => {
      try {
        const response = await store.getPunishments(store.user?.nickname)

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
        console.error(e.response?.data?.message)
      }
    }

    getPunishments()
  }, [store.user?.nickname])

  const date = (seconds) => {
    let d = new Date(1970, 0, 1)
    d.setUTCSeconds(seconds)
    d = d.toLocaleDateString('ru-RU')

    return d
  }

  if (!punishment) {
    return null
  }

  return (
    <div className={styles.alert}>
      <div
        className={cx(
          styles.alert__iconWrapper,
          styles[punishment.type.toLowerCase()]
        )}
      >
        <img
          className={styles.alert__icon}
          src={punishment.icon}
          alt=''
          draggable='false'
          loading='lazy'
        />
      </div>
      <div className={styles.alert__body}>
        <h4 className={styles.alert__title}>{punishment.title}</h4>
        <p className={styles.alert__reason}>{punishment.reason}</p>
        <p className={cx(styles.alert__duration, 'gray')}>
          {punishment.endDate !== 0
            ? `до ${date(punishment.endDate)}`
            : 'Навсегда'}
        </p>
      </div>
    </div>
  )
})

export default PunishmentAlert
