import Skeleton from '@/shared/ui/Skeleton'
import styles from './ArticleSkeleton.module.scss'

const ArticleSkeleton = () => {
  return (
    <article className={styles.skeleton}>
      <div className={styles.skeleton__titleWrapper}>
        <Skeleton className={styles.skeleton__icon} />
        <Skeleton className={styles.skeleton__title} />
      </div>
      <Skeleton className={styles.skeleton__description} />
    </article>
  )
}

export default ArticleSkeleton
