import Skeleton from '@/shared/ui/Skeleton'
import styles from './ProductsSkeleton.module.scss'

const ProductsSkeleton = () => {
  return (
    <li className={styles.card}>
      <Skeleton className={styles.card__image} />
      <div className={styles.card__body}>
        <Skeleton className={styles.card__title} />
        <Skeleton className={styles.card__price} />
        <Skeleton className={styles.card__button} />
      </div>
    </li>
  )
}

export default ProductsSkeleton
