import styles from './Logo.module.scss'

const Logo = () => {
    return (
        <a 
            className={styles.logo}
            href='/'
            draggable='false'
        >
        </a>
    )
}

export default Logo