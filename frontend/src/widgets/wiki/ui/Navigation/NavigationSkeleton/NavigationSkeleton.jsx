import { useContext } from 'react'
import styles from './NavigationSkeleton.module.scss'

import Skeleton from '@/shared/ui/Skeleton'
import { WikiContext } from '@/widgets/wiki/model/wikiContext'

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
