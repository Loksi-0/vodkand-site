import styles from './Legal.module.scss'

import { Link } from 'react-router'

const Legal = () => {
  const pages = [
    {
      title: 'политика конфиденциальности',
      link: 'privacy-policy'
    },
    {
      title: 'пользовательское соглашение',
      link: 'user-agreement'
    },
    {
      title: 'условия оплаты и возврата средств',
      link: 'payment-terms'
    },
    {
      title: 'публичная оферта',
      link: 'public-offer'
    },
    {
      title: 'контакты',
      link: 'contacts'
    }
  ]

  return (
    <nav className={styles.terms}>
      {pages.map((element, index) => {
        return (
          <Link
            className={styles.terms__link}
            to={`/legal/${element.link}`}
            key={index}
          >
            {element.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default Legal
