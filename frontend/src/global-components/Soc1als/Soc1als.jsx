import styles from './Soc1als.module.scss'

import discord from '@/assets/icons/soc1als/discord.svg'

const Soc1als = () => {
    const links = [
        {
            title: 'Discord',
            link: 'https://discord.gg/wQPsxX79',
            icon: discord
        }
    ]

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
                            target='_blank'
                        >
                            <span className='visually-hidden'>{link.title}</span>
                            <img 
                                className={styles.icon}
                                src={link.icon} 
                                alt=''
                                loading='lazy'
                                draggable='false' 
                            />
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

export default Soc1als