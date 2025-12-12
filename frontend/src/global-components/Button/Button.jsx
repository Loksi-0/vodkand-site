import styles from './Button.module.scss'

const Button = (props) => {
    const {
        color,
        children,
        type = 'button',
        isBig = false,
        onClick = () => {}
    } = props

    return (
        <button 
            type={type}
            className={`
                ${styles.button}
                ${styles[color]} 
                ${isBig ? styles.isBig : ''
            }`}
            onClick={onClick}
        >{children}</button>
    )
}

export default Button