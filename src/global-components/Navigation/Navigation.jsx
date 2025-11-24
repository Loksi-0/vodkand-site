import styles from './Navigation.module.scss'

const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <a 
                className={styles.link}
                href="/"
            ><big>Правила</big></a>
            <a 
                className={styles.link}
                href="/"
            ><big>Плагины</big></a>
            <a 
                className={styles.link}
                href="/"
            ><big>Цены</big></a>
        </nav>
    )
}

export default Navigation