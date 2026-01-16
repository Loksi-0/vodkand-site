import styles from './Punishments.module.scss'

import cx from 'clsx'

import mute from '@/shared/assets/icons/mute.png'
import warn from '@/shared/assets/icons/warn.png'
import ban from '@/shared/assets/icons/ban.png'
import Preloader from '@/shared/ui/Preloader'
import usePunishments from '../../model/usePunishments'

const Punishments = () => {
  const { isLoading, punishments, isPoshalko, date } = usePunishments()

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
          punishments.map((element, index) => {
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
                  <img
                    className={styles.list__icon}
                    src={
                      (element.type === 'WARN' && warn) ||
                      (element.type === 'BAN' && ban) ||
                      (element.type === 'MUTE' && mute)
                    }
                    alt=''
                    loading='lazy'
                    draggable='false'
                  />
                </div>
                <div className={styles.list__body}>
                  <h3 className='h4'>
                    {(element.type === 'WARN' && 'Предупреждение') ||
                      (element.type === 'BAN' && 'Бан') ||
                      (element.type === 'MUTE' && 'Мут')}
                  </h3>
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
