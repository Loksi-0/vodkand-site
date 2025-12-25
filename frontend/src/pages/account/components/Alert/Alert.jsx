import styles from './Alert.module.scss'

import Button from '@/global-components/Button/Button'

import warn from '@/assets/icons/warn.png'
import ban from '@/assets/icons/ban.png'

const Alert = (props) => {
    const { 
        color, 
        title, 
        description, 
        disclaimer = false,
        onClick, 
        textButton
    } = props

    return (
        <section className={styles.alert}>
            <div className={styles.alert__body}>
                <div className={styles.content}>
                    <div className={`${styles.iconWrapper} ${styles[color]}`}>
                        <img 
                            className={styles.icon}
                            src={color === 'red' ? ban : warn}
                            alt=''
                            loading='lazy' 
                            draggable='false'
                        />
                    </div>
                    <div className={styles.body}>
                        <h1 className={`${styles.title} h3`}>{title}</h1>
                        <p className={styles.description}>{description}</p>
                    </div>
                </div>
                <div className={styles.button}>
                    <Button color='dark' onClick={onClick}>
                        {textButton}
                    </Button>
                </div>
            </div>
            {
                disclaimer && <p className='gray-text'>Неактивированные аккаунты и аккаунты без проходки удаляются через 10 дней</p>
            }
        </section>
    )
}

export default Alert