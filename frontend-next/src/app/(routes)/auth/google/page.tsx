'use client'

import styles from './GoogleAuth.module.scss'

import cx from 'clsx'

import Button from '@/shared/ui/Button'
import Preloader from '@/shared/ui/Preloader'
import { useRouter } from 'next/navigation'
import useGoogleAuth from './useGoogleAuth'

const GoogleAuth = () => {
  const router = useRouter()

  const { error } = useGoogleAuth()

  return (
    <main className={cx(styles.googleAuth, 'container')}>
      {error ? (
        <div className={styles.googleAuth__error}>
          <h1 className='h4'>{error}</h1>
          <Button
            color='accent'
            onClick={() => {
              router.push('/auth')
            }}
          >
            Вернуться на страницу входа
          </Button>
        </div>
      ) : (
        <Preloader size={100} />
      )}
    </main>
  )
}

export default GoogleAuth
