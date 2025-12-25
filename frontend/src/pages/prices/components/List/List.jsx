import Button from '@/global-components/Button/Button'
import styles from './List.module.scss'
import pass from '@/assets/images/frog.png'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { Context } from '@/main'

const List = () => {
    const { store } = useContext(Context)

    const navigate = useNavigate()

    const price = Number(import.meta.env.VITE_PASS_PRICE)
    const sale = Number(import.meta.env.VITE_PASS_SALE)

    const buttonHref = () => {
        if (store.isLoading) return
        if (!store.isAuth) return '/auth'
        if (!store.user?.isActivated) return '/account'
        if (!store.user?.hasPass) return '/payment'
        if (!store.user?.nickname) return '/whitelist'
        return
    }

    return (
        <section className={styles.list}>
            <ul className={`${styles.list__inner} container`}>
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
                    <div className={styles.list__content}>
                        <div className={styles.list__body}>
                            <h2 className={`${styles.list__title} h3`}>Доступ на сервер</h2>
                            <div className={styles.list__price}>
                                <h3 className='h2'>{sale ? sale : price}&nbsp;₽</h3>
                                {sale && <p className={styles.list__priceOld}>
                                    {price}&nbsp;₽
                                </p>}
                            </div>
                        </div>
                        <Button 
                            color='accent'
                            onClick={() => navigate(buttonHref())}
                        >
                            Купить проходку
                        </Button>
                    </div>
                </li>
            </ul>
        </section>
    )
}

export default List