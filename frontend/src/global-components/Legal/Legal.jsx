import { Link } from 'react-router'
import styles from './Legal.module.scss'

const Legal = () => {
    return (
        <nav className={styles.terms}>
            <Link 
                className={styles.link}
                to="/legal/privacy-policy"
            >
                политика конфиденциальности
            </Link>
            <Link 
                className={styles.link}
                to="/legal/payment-terms"
            >
                условия оплаты
            </Link>
            <Link 
                className={styles.link}
                to="/legal/contacts"
            >
                контакты
            </Link>
        </nav>
    )
}

export default Legal