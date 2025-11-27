import styles from './Warns.module.scss'

import warn from '@/assets/icons/warn.png'

const Warns = () => {
    const warns = [
    ]

    return (
        <section className={styles.warns}>
            <h2 className='h3'>Предупреждения</h2>
            <ul className={`${styles.warnsList} ${!warns[0] && styles.isEmpty}`}>
                {warns.map((element, index) => {
                    return (
                        <li key={index} className={styles.warnsList__item}>
                            <img 
                                className={styles.warnsList__icon}
                                src={warn}
                                alt="" 
                                loading='lazy'
                            />
                            <div className={styles.warnsList__body}>
                                <h3 className='h4'>Предупреждение</h3>
                                <p className={styles.warnsList__reason}>{element.reason}</p>
                                <p className={styles.warnsList__expires}>Срок действия: {element.expires !== 'forever' ? `до ${element.expires}` : 'Навсегда'}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Warns