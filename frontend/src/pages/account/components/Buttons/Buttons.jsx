import styles from './Buttons.module.scss'

import Button from '@/global-components/Button/Button'

const Buttons = (props) => {
    const { onLogout } = props

    return (
        <section className={styles.buttons}>
            <Button 
                color='red'
                onClick={onLogout}
            >
                Выйти из аккаунта
            </Button>
            {/* <Button 
                color='redPale'
            >
                Сообщить о нарушении
            </Button> */}
        </section>
    )
}

export default Buttons