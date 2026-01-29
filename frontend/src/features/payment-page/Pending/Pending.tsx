import styles from './Pending.module.scss'

import Button from '@/shared/ui/Button'
import Header from '@/widgets/header'
import { MainContext } from '@/app/context/MainContext'
import { useNavigate } from 'react-router'
import useCustomContext from '@/shared/hooks/useCustomContext'

const Pending = () => {
  const { userStore } = useCustomContext(MainContext)
  const navigate = useNavigate()

  if (userStore.user?.hasPass) {
    void navigate('/account', { replace: true })
  }

  return (
    <>
      <Header />
      <main className={styles.pending}>
        <section className={styles.pending__inner}>
          <div className={styles.pending__icon}>
            <svg
              width='800px'
              height='800px'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <div className={styles.pending__body}>
            <h1 className='h2'>Успешно</h1>
            <p className={styles.pending__description}>
              Заказ создан и будет выполнен в ближайшее время
            </p>
          </div>
          <Button
            color='accent'
            className={styles.pending__button}
            onClick={() => {
              window.location.replace('/account')
            }}
          >
            Перейти в аккаунт
          </Button>
        </section>
      </main>
    </>
  )
}

export default Pending
