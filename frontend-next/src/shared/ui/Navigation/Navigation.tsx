import styles from './Navigation.module.scss'

import cx from 'clsx'

import Link from 'next/link'
import { links } from '@/shared/ui/Navigation/navigation.data'

type NavigationProps = {
  tabFocus?: boolean
  usedInTile?: boolean
}

const Navigation = (props: NavigationProps) => {
  const { tabFocus = true, usedInTile = false } = props

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        {links.map((element, index) => {
          return (
            <li
              className={styles.list__item}
              key={index}
            >
              <Link
                className={cx(styles.list__link, {
                  [styles.inTile]: usedInTile
                })}
                href={element.href}
                tabIndex={tabFocus ? 0 : -1}
              >
                <big>{element.title}</big>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
