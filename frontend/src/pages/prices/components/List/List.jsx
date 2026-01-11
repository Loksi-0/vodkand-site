import styles from './List.module.scss'

import cx from 'clsx'

import Button from '@/global-components/Button/Button'
import pass from '@/assets/images/frog.png'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import usePaymentButton from '@/hooks/usePaymentButton'

import { products } from '@/pages/prices/components/List/list.data'

const List = observer(() => {
  const { userStore } = useContext(Context)

  const navigate = useNavigate()
  const buttonHref = usePaymentButton()

  return (
    <section className={styles.list}>
      <ul className={cx(styles.list__inner, 'container')}>
        {products.map((product, index) => {
          return (
            <li
              className={styles.list__item}
              key={index}
            >
              <div className={styles.list__imageWrapper}>
                <img
                  className={styles.list__image}
                  src={pass}
                  alt=''
                  loading='lazy'
                  draggable='false'
                />
              </div>
              <div className={styles.list__body}>
                <div className={styles.list__content}>
                  <h2 className={cx(styles.list__title, 'h3')}>
                    {product.title}
                  </h2>
                  <div className={styles.list__price}>
                    <h3 className='h2'>
                      {product.sale ? product.sale : product.price}&nbsp;₽
                    </h3>
                    {product.sale && (
                      <p className={styles.list__sale}>
                        {product.price}&nbsp;₽
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  color='accent'
                  disabled={userStore.isLoading}
                  onClick={() => navigate(buttonHref)}
                >
                  Купить проходку
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
})

export default List
