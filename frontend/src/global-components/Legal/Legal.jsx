import styles from './Legal.module.scss'

import { Link } from 'react-router'

import { pages } from '@/global-components/Legal/legal.data'

const Legal = () => {
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
