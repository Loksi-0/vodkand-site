import styles from './Title.module.scss'

import cx from 'clsx'

const Title = (props) => {
  const { title } = props

  return (
    <section className={cx(styles.section, 'container')}>
      <h1 className={styles.title}>{title}</h1>
    </section>
  )
}

export default Title
