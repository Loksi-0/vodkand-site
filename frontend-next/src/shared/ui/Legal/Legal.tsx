import styles from './Legal.module.scss'

import Link from 'next/link'

import { pages } from '@/shared/ui/Legal/legal.data'

const Legal = () => {
  return (
    <nav className={styles.terms}>
      {pages.map((element, index) => {
        return (
          <Link
            className={styles.terms__link}
            href={`/legal/${element.link}`}
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
