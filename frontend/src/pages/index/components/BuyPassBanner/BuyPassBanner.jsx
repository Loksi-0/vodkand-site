import styles from './BuyPassBanner.module.scss'

import Button from '@/global-components/Button/Button'

import pass from '@/assets/images/frog.png'
import { useContext } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'

const BuyPassBanner = () => {
  const { store } = useContext(Context)
  const navigate = useNavigate()

  const price = Number(import.meta.env.VITE_PASS_PRICE)
  const sale = Number(import.meta.env.VITE_PASS_SALE)

  const buttonHref = () => {
    if (!store.isAuth) {
      return '/auth'
    }
    if (!store.user?.isActivated) {
      return '/account'
    }
    if (!store.user?.hasPass) {
      return '/payment'
    }
    if (!store.user?.nickname) {
      return '/whitelist'
    }
    if (store.user?.nickname) {
      return '/account'
    }
    return
  }

  return (
    <section className={styles.section}>
      <div className={`${styles.section__inner} container`}>
        <div className={styles.left}>
          <h3 className={styles.title}>Присоединяйтесь сейчас</h3>
          <ul className={styles.description}>
            <li className={styles.description__item}>
              <div className={styles.description__icon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#000000'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z' />
                </svg>
              </div>
              <p className={styles.description__content}>
                Доступ выдается навсегда
              </p>
            </li>
            <li className={styles.description__item}>
              <div className={styles.description__icon}>
                <svg
                  width='800px'
                  height='800px'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='3'
                    y='6'
                    width='18'
                    height='13'
                    rx='2'
                    stroke='#000000'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M3 10H20.5'
                    stroke='#000000'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7 15H9'
                    stroke='#000000'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <p className={styles.description__content}>
                Покупка осуществляется 1 раз, без повторных платежей и подписок
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <div className={styles.productTitle}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={pass}
                alt=''
                loading='lazy'
                draggable='false'
              />
            </div>
            <h4 className='h4'>Доступ на сервер</h4>
          </div>
          <h4 className={`${styles.price} h1`}>{sale ? sale : price}&nbsp;₽</h4>
          <Button
            color='accent'
            disabled={store.isLoading}
            onClick={() => {
              navigate(buttonHref())
            }}
          >
            Купить проходку
          </Button>
        </div>
      </div>
    </section>
  )
}

export default observer(BuyPassBanner)
