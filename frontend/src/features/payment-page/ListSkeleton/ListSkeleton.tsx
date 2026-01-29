import Skeleton from '@/shared/ui/Skeleton'
import styles from './ListSkeleton.module.scss'

const ListSkeleton = () => {
  return (
    <li className={styles.item}>
      <Skeleton className={styles.item__image} />
      <div className={styles.item__body}>
        <Skeleton className={styles.item__title} />
        <div className={styles.item__description}>
          <Skeleton className={styles.item__descriptionItem} />
          <Skeleton className={styles.item__descriptionItem} />
        </div>
        <Skeleton className={styles.item__price} />
      </div>
    </li>
  )
}

export default ListSkeleton
