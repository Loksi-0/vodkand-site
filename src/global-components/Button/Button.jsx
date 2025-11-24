import styles from './Button.module.scss'

const Button = (props) => {
  const {
    color,
    text,
    type = 'button',
    isBig = false
  } = props

  return (
    <button 
      type={type}
      className={`
        ${styles.button}
        ${styles[color]} 
        ${isBig ? styles.isBig : ''
      }`}
    >{text}</button>
  )
}

export default Button