import styles from './Buttons.module.scss'

import Button from '@/global-components/Button/Button'

const Buttons = (props) => {
    const { onLogout } = props

    return (
        <section className={styles.buttons}>
            <Button 
                color='red'
                text='Выйти из аккаунта'
                onClick={onLogout}
            />
            <Button 
                color='redPale'
                text='Сообщить о нарушении'
            />
        </section>
    )
}

export default Buttons