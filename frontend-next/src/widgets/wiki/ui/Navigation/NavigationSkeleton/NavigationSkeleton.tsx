import styles from './NavigationSkeleton.module.scss'

import Skeleton from '@/shared/ui/Skeleton'

const NavigationSkeleton = () => {
  return (
    <nav>
      <ul className={styles.skeleton}>
        <li>
          <Skeleton className={styles.skeleton__item} />
        </li>
        <li>
          <Skeleton className={styles.skeleton__item} />
        </li>
        <li>
          <Skeleton className={styles.skeleton__item} />
        </li>
        <li>
          <Skeleton className={styles.skeleton__item} />
        </li>
      </ul>
    </nav>
  )
}

export default NavigationSkeleton
