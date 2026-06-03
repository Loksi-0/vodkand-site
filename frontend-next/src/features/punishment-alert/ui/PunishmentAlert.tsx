'use client'

import styles from './PunishmentAlert.module.scss'

import cx from 'clsx'

import { observer } from 'mobx-react-lite'
import useDate from '@/shared/hooks/useDate'
import useAlert from '../api/useAlert'
import Image from 'next/image'

const PunishmentAlert = observer(() => {
  const { punishment } = useAlert()

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
        <Image
          className={styles.alert__icon}
          src={punishment.icon}
          alt=''
          draggable='false'
          loading='lazy'
          width={150}
          height={150}
        />
      </div>
      <div className={styles.alert__body}>
        <h4 className={styles.alert__title}>{punishment.title}</h4>
        <p className={styles.alert__reason}>{punishment.reason}</p>
        <p className={cx(styles.alert__duration, 'gray')}>
          {punishment.endDate !== 0
            ? `до ${useDate(punishment.endDate)}`
            : 'Навсегда'}
        </p>
      </div>
    </div>
  )
})

export default PunishmentAlert
