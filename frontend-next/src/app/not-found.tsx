'use client'

import styles from './not-found/NotFound.module.scss'

import cx from 'clsx'

import Header from '@/widgets/header'
import frog from '@/shared/assets/images/frog.png'

import Button from '@/shared/ui/Button'
import useNotFound from './not-found/useNotFound'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const NotFound = () => {
  const router = useRouter()

  const { logoRef, mainRef, headerRef } = useNotFound()

  // usePageMetadata({
  //   title: 'Страница не найдена',
  //   index: false,
  //   follow: false
  // })

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
              onClick={() => {
                router.back()
              }}
            >
              Назад
            </Button>
          </div>
          <div className={styles.notFound__image}>
            <Image
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
