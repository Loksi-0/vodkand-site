import styles from './Title.module.scss'

const Title = () => {
  return (
    <h1
      draggable='false'
      className={`${styles.title} h0`}
    >
      Vodkand
    </h1>
  )
}

export default Title
