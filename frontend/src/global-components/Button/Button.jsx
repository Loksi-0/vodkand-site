import styles from './Button.module.scss'

import Preloader from '../Preloader/Preloader'

const Button = (props) => {
    const {
        color,
        children,
        type = 'button',
        isBig = false,
        onClick = () => {},
        loading = false,
        disabled = false,
        className = '',
        style = {},
        title = ''
    } = props

    return (
        <button 
            type={type}
            className={`
                ${styles.button}
                ${styles[color]} 
                ${isBig ? styles.isBig : ''}
                ${disabled && styles.disabled}
                ${className}
            `}
            style={style}
            title={title}
            onClick={!disabled ? onClick : undefined}
        >
            {
                loading
                ? <Preloader size={30} />
                : children
            }
        </button>
    )
}

export default Button