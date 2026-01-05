import styles from './Legal.module.scss'

import { Link } from 'react-router'

const Legal = () => {
  return (
    <nav className={styles.terms}>
      <Link
        className={styles.link}
        to='/legal/privacy-policy'
      >
        политика конфиденциальности
      </Link>
      <Link
        className={styles.link}
        to='/legal/user-agreement'
      >
        пользовательское соглашение
      </Link>
      <Link
        className={styles.link}
        to='/legal/payment-terms'
      >
        условия оплаты и возврата средств
      </Link>
      <Link
        className={styles.link}
        to='/legal/public-offer'
      >
        публичная оферта
      </Link>
      <Link
        className={styles.link}
        to='/legal/contacts'
      >
        контакты
      </Link>
    </nav>
  )
}

export default Legal
