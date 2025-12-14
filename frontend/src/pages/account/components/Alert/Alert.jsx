import styles from './Alert.module.scss'

import Button from '@/global-components/Button/Button'

import warn from '@/assets/icons/warn.png'
import ban from '@/assets/icons/ban.png'
import { observer } from 'mobx-react-lite'

const Alert = (props) => {
    const { 
        color, 
        title, 
        description, 
        onClick, 
        textButton 
    } = props

    return (
        <section className={styles.alert}>
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
        </section>
    )
}

export default Alert