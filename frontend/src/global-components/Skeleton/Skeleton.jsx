import styles from './Skeleton.module.scss'

import cx from 'clsx'

const Skeleton = (props) => {
  const { className = '', style = {} } = props

  return (
    <div
      className={cx(styles.skeleton, className)}
      style={style}
    ></div>
  )
}

export default Skeleton
