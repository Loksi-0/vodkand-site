import styles from './Activate.module.scss'

import Button from '@/global-components/Button/Button'
import { useContext, useEffect, useState } from 'react'
import ok from '@/assets/icons/ok.svg'
import error from '@/assets/icons/error.svg'
import usePageMetadata from '@/usePageMetadata'
import { useLocation } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'

const Activate = () => {
  const location = useLocation()

  const { store } = useContext(Context)

  const [title, setTitle] = useState('Выполняется активация...')
  const [status, setStatus] = useState('waiting')
  const [preloaderIcon, setPreloaderIcon] = useState(null)
  const [preloader, setPreloader] = useState(styles.preloader)

  useEffect(() => {
    const activate = async () => {
      try {
        const activationLink = new URLSearchParams(location.search).get('link')

        await store.activate(activationLink)

        localStorage.setItem('isActivated', true)
        setTitle('Активация прошла успешно')
        setPreloader(`${styles.preloader} ${styles.ok}`)
        setPreloaderIcon(ok)
        setStatus('ok')
      } catch (e) {
        setTitle(e.message)
        setPreloader(`${styles.preloader} ${styles.error}`)
        setPreloaderIcon(error)
        setStatus('error')
      }
    }

    activate()
  }, [])

  usePageMetadata({
    title: 'Активация',
    index: false,
    follow: false
  })

  return (
    <main>
      <section className={`${styles.activate} container`}>
        <div className={styles.preloader__wrapper}>
          <div className={preloader}>
            <img
              className={styles.icon}
              src={preloaderIcon}
              alt=''
              draggable='false'
            />
          </div>
        </div>
        <h1 className={`${styles.title} h3`}>{title}</h1>
        {status === 'waiting' && <div className={styles.preButton}></div>}
        {status === 'ok' && (
          <Button
            color='accent'
            onClick={() => (window.location.href = '/account')}
          >
            Перейти в аккаунт
          </Button>
        )}
        {status === 'error' && (
          <Button
            color='red'
            onClick={() => (window.location.href = '/account')}
          >
            Перейти в аккаунт
          </Button>
        )}
      </section>
    </main>
  )
}

export default observer(Activate)
