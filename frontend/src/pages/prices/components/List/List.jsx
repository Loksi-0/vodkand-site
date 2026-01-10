import styles from './List.module.scss'

import cx from 'clsx'

import Button from '@/global-components/Button/Button'
import pass from '@/assets/images/frog.png'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'

const List = observer(() => {
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
    <section className={styles.list}>
      <ul className={cx(styles.list__inner, 'container')}>
        <li className={styles.list__item}>
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
              <h2 className={cx(styles.list__title, 'h3')}>Доступ на сервер</h2>
              <div className={styles.list__price}>
                <h3 className='h2'>{sale ? sale : price}&nbsp;₽</h3>
                {sale && <p className={styles.list__sale}>{price}&nbsp;₽</p>}
              </div>
            </div>
            <Button
              color='accent'
              disabled={store.isLoading}
              onClick={() => navigate(buttonHref())}
            >
              Купить проходку
            </Button>
          </div>
        </li>
      </ul>
    </section>
  )
})

export default List
