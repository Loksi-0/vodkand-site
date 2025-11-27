import styles from './Terms.module.scss'

const Terms = () => {
    return (
        <nav className={styles.terms}>
            <a 
                className={styles.link}
                href="/"
            >
                политика конфиденциальности
            </a>
            <a 
                className={styles.link}
                href="/"
            >
                условия оплаты
            </a>
            <a 
                className={styles.link}
                href="/"
            >
                контакты
            </a>
            <a 
                className={styles.link}
                href="/"
            >
                цены
            </a>
        </nav>
    )
}

export default Terms