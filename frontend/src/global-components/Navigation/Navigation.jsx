import styles from './Navigation.module.scss'

import cx from 'clsx'

import { Link } from 'react-router'
import { links } from '@/global-components/Navigation/navigation.data'

const Navigation = (props) => {
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
                to={element.href}
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
