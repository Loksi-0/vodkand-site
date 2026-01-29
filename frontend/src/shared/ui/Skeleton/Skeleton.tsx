import styles from './Skeleton.module.scss'

import cx from 'clsx'

type SkeletonProps = {
  className?: string
  style?: object
}

const Skeleton = (props: SkeletonProps) => {
  const { className = '', style = {} } = props

  return (
    <div
      className={cx(styles.skeleton, className)}
      style={style}
    ></div>
  )
}

export default Skeleton
