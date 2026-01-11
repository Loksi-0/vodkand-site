import styles from './NotFound.module.scss'

import cx from 'clsx'

import Header from '@/global-components/Header/Header'
import frog from '@/assets/images/frog.png'

import Button from '@/global-components/Button/Button'
import usePageMetadata from '@/hooks/usePageMetadata.js'
import { useNavigate } from 'react-router'
import useNotFound from '@/pages/notFound/useNotFound'

const NotFound = () => {
  const navigate = useNavigate()

  const { logoRef, mainRef, headerRef } = useNotFound()

  usePageMetadata({
    title: 'Страница не найдена',
    index: false,
    follow: false
  })

  return (
    <>
      <Header ref={headerRef} />
      <main
        ref={mainRef}
        className={styles.notFound}
      >
        <section className={cx(styles.notFound__container, 'container')}>
          <div className={styles.notFound__body}>
            <div className={styles.notFound__content}>
              <h1 className='h0'>404</h1>
              <p>Страница не найдена</p>
            </div>
            <Button
              color='accent'
              onClick={() => navigate(-1)}
            >
              Назад
            </Button>
          </div>
          <div className={styles.notFound__image}>
            <img
              className={styles.notFound__logo}
              ref={logoRef}
              src={frog}
              alt=''
              draggable='false'
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default NotFound
