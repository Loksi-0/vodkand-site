import styles from './Navigation.module.scss'

const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <a 
                className={styles.link}
                href="/rules"
            ><big>Правила</big></a>
            <a 
                className={styles.link}
                href="/plugins"
            ><big>Плагины</big></a>
            <a 
                className={styles.link}
                href="/prices"
            ><big>Цены</big></a>
        </nav>
    )
}

export default Navigation