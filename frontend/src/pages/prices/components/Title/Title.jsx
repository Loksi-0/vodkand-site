import styles from './Title.module.scss'

const Title = (props) => {
  const { title } = props

  return (
    <section className={`${styles.section} container`}>
      <h1 className={styles.title}>{title}</h1>
    </section>
  )
}

export default Title
