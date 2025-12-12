import styles from './Navigation.module.scss'

const Navigation = (props) => {
    const { tabFocus = true } = props

    const links = [
        { title: 'Правила', href: '/rules' },
        { title: 'Плагины', href: '/plugins' },
        { title: 'Цены', href: '/prices' }
    ]

    return (
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                {links.map((element, index) => {
                    return (
                        <li 
                            className={styles.list__item} 
                            key={index}
                        >
                            <a 
                                className={styles.link}
                                href={element.href}
                                tabIndex={tabFocus ? 0 : -1}
                            ><big>{element.title}</big></a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Navigation