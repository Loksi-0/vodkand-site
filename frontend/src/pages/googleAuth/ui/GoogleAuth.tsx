import styles from './GoogleAuth.module.scss'

import cx from 'clsx'

import Button from '@/shared/ui/Button'
import Preloader from '@/shared/ui/Preloader'
import { useNavigate } from 'react-router'
import useGoogleAuth from '../model/useGoogleAuth'

const GoogleAuth = () => {
  const navigate = useNavigate()

  const { error } = useGoogleAuth()

  return (
    <main className={cx(styles.googleAuth, 'container')}>
      {error ? (
        <div className={styles.googleAuth__error}>
          <h1 className='h4'>{error}</h1>
          <Button
            color='accent'
            onClick={() => {
              void navigate('/auth')
            }}
          >
            Вернуться на страницу входа
          </Button>
        </div>
      ) : (
        <Preloader size='100px' />
      )}
    </main>
  )
}

export default GoogleAuth
