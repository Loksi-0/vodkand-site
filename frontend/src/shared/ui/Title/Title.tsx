import styles from './Title.module.scss'

import cx from 'clsx'

const Title = () => {
  return (
    <h1
      draggable='false'
      className={cx(styles.title, 'h0')}
    >
      Vodkand
    </h1>
  )
}

export default Title
