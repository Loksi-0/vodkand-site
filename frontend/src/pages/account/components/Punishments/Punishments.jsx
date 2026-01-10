import styles from './Punishments.module.scss'

import cx from 'clsx'

import { useContext, useEffect, useState } from 'react'

import mute from '@/assets/icons/mute.png'
import warn from '@/assets/icons/warn.png'
import ban from '@/assets/icons/ban.png'
import { Context } from '@/main'
import Preloader from '@/global-components/Preloader/Preloader'

const Punishments = () => {
  const { store } = useContext(Context)

  const [loading, setLoading] = useState(false)
  const [punishments, setPunishments] = useState([])
  const [isPoshalko] = useState(Math.random(Date.now()) < 0.01)

  useEffect(() => {
    setLoading(true)

    const getPunishments = async () => {
      try {
        const response = await store.getPunishments(store.user?.nickname)

        setLoading(false)
        setPunishments(response.data)
      } catch (e) {
        console.error(e.response?.data?.message)
      }
    }

    getPunishments()
  }, [])

  const date = (seconds) => {
    let d = new Date(1970, 0, 1)
    d.setUTCSeconds(seconds)
    d = d.toLocaleDateString('ru-RU')

    return d
  }

  return (
    <section className={styles.punishments}>
      <h2 className='h3'>Наказания</h2>
      <ul
        className={cx(styles.list, {
          [styles.loading]: loading,
          [styles.poshalko]: isPoshalko && !punishments[0] && !loading,
          [styles.empty]: !isPoshalko && !punishments[0] && !loading
        })}
      >
        {loading && <Preloader size={50} />}
        {!loading &&
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
