import Button from '@/global-components/Button/Button'
import styles from './List.module.scss'
import pass from '@/assets/images/frog.png'

const List = () => {
    return (
        <div className={styles.list}>
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
                            <h2 className='h3'>Доступ на сервер</h2>
                            <h3 className='h2'>100&nbsp;₽</h3>
                        </div>
                        <Button 
                            color='accent'
                            text='Купить проходку'
                        />
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default List