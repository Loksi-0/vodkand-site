import styles from './Alert.module.scss'

import cx from 'clsx'

import Button from '@/shared/ui/Button'

import warn from '@/shared/assets/icons/warn.png'
import ban from '@/shared/assets/icons/ban.png'
import Image from 'next/image'

type AlertType = {
  color: 'red' | 'yellow'
  title: string
  description: string
  disclaimer?: boolean
  onClick: () => void
  textButton: string
}

const Alert = (props: AlertType) => {
  const {
    color,
    title,
    description,
    disclaimer = false,
    onClick,
    textButton
  } = props

  return (
    <section className={styles.alert}>
      <div className={styles.alert__body}>
        <div className={styles.alert__content}>
          <div className={cx(styles.alert__contentIconWrapper, styles[color])}>
            <Image
              className={styles.icon}
              src={color === 'red' ? ban : warn}
              alt=''
              loading='lazy'
              draggable='false'
            />
          </div>
          <div className={styles.alert__contentBody}>
            <h1 className='h3'>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.alert__button}>
          <Button
            color='dark'
            onClick={onClick}
          >
            {textButton}
          </Button>
        </div>
      </div>
      {disclaimer && (
        <p className='gray'>
          Неактивированные аккаунты и аккаунты без проходки удаляются через 10
          дней
        </p>
      )}
    </section>
  )
}

export default Alert
