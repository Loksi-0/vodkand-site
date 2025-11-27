import Button from '@/global-components/Button/Button'
import styles from './Buttons.module.scss'

const Buttons = () => {
    return (
        <section className={styles.buttons}>
            <Button 
                color='red'
                text='Удалить аккаунт'
            />
            <Button 
                color='redPale'
                text='Сообщить о нарушении'
            />
        </section>
    )
}

export default Buttons