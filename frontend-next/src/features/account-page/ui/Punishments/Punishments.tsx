'use client'

import styles from './Punishments.module.scss'

import cx from 'clsx'

import Preloader from '@/shared/ui/Preloader'
import usePunishments from '../../model/usePunishments'
import date from '@/shared/hooks/useDate'
import Image from 'next/image'

const Punishments = () => {
  const { isLoading, punishments, isPoshalko, icons, titles } = usePunishments()

  return (
    <section className={styles.punishments}>
      <h2 className='h3'>Наказания</h2>
      <ul
        className={cx(styles.list, {
          [styles.loading]: isLoading,
          [styles.poshalko]: isPoshalko && !punishments[0] && !isLoading,
          [styles.empty]: !isPoshalko && !punishments[0] && !isLoading
        })}
      >
        {isLoading && <Preloader size={50} />}
        {!isLoading &&
          punishments.map((element, index: number) => {
            return (
              <li
                key={index}
                className={styles.list__item}
              >
                <div
                  className={cx(
                    styles.list__iconWrapper,
                    (element.type === 'WARN' && styles.warn) ||
                      (element.type === 'BAN' && styles.ban) ||
                      (element.type === 'MUTE' && styles.mute)
                  )}
                >
                  <Image
                    className={styles.list__icon}
                    src={icons[element.type]}
                    alt=''
                    loading='lazy'
                    draggable='false'
                  />
                </div>
                <div className={styles.list__body}>
                  <h3 className='h4'>{titles[element.type]}</h3>
                  <p className={styles.list__reason}>{element.reason}</p>
                  <p className={styles.list__date}>
                    Срок действия:{' '}
                    {element.endDate !== 0
                      ? `до ${date(element.endDate)}`
                      : 'Навсегда'}
                  </p>
                </div>
              </li>
            )
          })}
      </ul>
    </section>
  )
}

export default Punishments
