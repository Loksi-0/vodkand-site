import { useContext } from 'react'
import styles from './NavigationSkeleton.module.scss'

import Skeleton from '@/global-components/Skeleton/Skeleton'
import { WikiContext } from '@/context/WikiContext/wikiContext'

const NavigationSkeleton = () => {
  const { navigation, navWidths } = useContext(WikiContext)

  return (
    <nav>
      <ul className={styles.skeleton}>
        {navigation.map((element, index) => {
          return (
            <li key={index}>
              <Skeleton
                className={styles.skeleton__item}
                style={{ width: navWidths[index] }}
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavigationSkeleton
