import Button from '@/global-components/Button/Button'
import styles from './List.module.scss'
import pass from '@/assets/images/frog.png'

const List = () => {
    const price = Number(import.meta.env.VITE_PASS_PRICE)
    const sale = Number(import.meta.env.VITE_PASS_SALE)

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