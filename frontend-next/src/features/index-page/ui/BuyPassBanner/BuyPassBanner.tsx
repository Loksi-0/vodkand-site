'use client'

import styles from './BuyPassBanner.module.scss'

import cx from 'clsx'

import Button from '@/shared/ui/Button/Button'

import pass from '@/shared/assets/images/frog.png'
import { observer } from 'mobx-react-lite'
import useBanner from '../../model/useBanner'
import Skeleton from '@/shared/ui/Skeleton'

const BuyPassBanner = observer(() => {
  const { isLoading, price, onClick } = useBanner()

  return (
    <section className={styles.banner}>
      <div className={cx(styles.banner__inner, 'container')}>
        <div className={styles.left}>
          <h3 className={styles.left__title}>Присоединяйтесь сейчас</h3>
          <ul className={styles.left__list}>
            <li className={styles.left__listItem}>
              <div className={styles.left__listIcon}>
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
              <p>Доступ выдается навсегда</p>
            </li>
            <li className={styles.left__listItem}>
              <div className={styles.left__listIcon}>
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
              <p>
                Покупка осуществляется 1 раз, без повторных платежей и подписок
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <div className={styles.right__title}>
            <div className={styles.right__imageWrapper}>
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
          <h4 className={cx(styles.right__price, 'h1')}>
            {isLoading ? (
              <Skeleton className={styles.right__priceSkeleton} />
            ) : (
              <span>{price}</span>
            )}
            &nbsp;₽
          </h4>
          <Button
            color='accent'
            disabled={isLoading}
            onClick={onClick}
          >
            Купить проходку
          </Button>
        </div>
      </div>
    </section>
  )
})

export default BuyPassBanner
