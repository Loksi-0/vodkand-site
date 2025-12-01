import styles from './Terms.module.scss'

const Terms = () => {
    return (
        <nav className={styles.terms}>
            <a 
                className={styles.link}
                href="/terms"
            >
                политика конфиденциальности
            </a>
            <a 
                className={styles.link}
                href="/terms?tab=2"
            >
                условия оплаты
            </a>
            <a 
                className={styles.link}
                href="/terms?tab=3"
            >
                контакты
            </a>
        </nav>
    )
}

export default Terms