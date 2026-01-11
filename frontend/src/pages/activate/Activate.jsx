import styles from './Activate.module.scss'

import cx from 'clsx'

import Button from '@/global-components/Button/Button'
import usePageMetadata from '@/hooks/usePageMetadata.js'
import { observer } from 'mobx-react-lite'

import ok from '@/assets/icons/ok.svg'
import error from '@/assets/icons/error.svg'
import useActivate from '@/pages/activate/useActivate'

const Activate = observer(() => {
  const { title, status } = useActivate()

  usePageMetadata({
    title: 'Активация',
    index: false,
    follow: false
  })

  return (
    <main>
      <section className={cx(styles.activate, 'container')}>
        <div className={styles.preloaderWrapper}>
          <div
            className={cx(styles.preloader, {
              [styles.ok]: status === 'ok',
              [styles.error]: status === 'error'
            })}
          >
            <img
              className={styles.preloader__icon}
              src={status === 'pending' ? null : status === 'ok' ? ok : error}
              alt=''
              draggable='false'
            />
          </div>
        </div>
        <h1 className={cx(styles.activate__title, 'h3')}>{title}</h1>
        {status === 'pending' && (
          <div className={styles.activate__preButton}></div>
        )}
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
})

export default Activate
