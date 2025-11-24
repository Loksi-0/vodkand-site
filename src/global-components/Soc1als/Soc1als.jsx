import styles from './Soc1als.module.scss'

const Soc1als = (props) => {
    const { links } = props

    return (
        <ul className={styles.list}>
            {links.map((link, index) => {
                return ( 
                    <li 
                        key={index}
                        className={styles.list__item}
                    >
                        <a 
                            className={styles.link}
                            href={link.link}
                        >
                            <span className='visually-hidden'>{link.title}</span>
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

export default Soc1als