import Button from '@/global-components/Button/Button'
import styles from './Alert.module.scss'
import { useContext } from 'react'
import { Context } from '@/main'

const Alert = (props) => {
    const { type } = props

    const { store } = useContext(Context)

    if (type === 'not-activated') {
        return (
            <section className={`${styles.notActivated} ${styles.alert}`}>
                <div className={styles.body}>
                    <h1 className={`${styles.title} h3`}>Аккаунт не активирован</h1>
                    <p className={styles.description}>активируйте аккаунт по ссылке в письме</p>
                </div>
                <Button text='Отправить письмо еще раз' color='accent' onClick={() => store.sendMail(store.user.email)} />
            </section>
        )
    }

    if (type === 'has-not-pass') {
        return (
            <section className={`${styles.hasNotPass} ${styles.alert}`}>
                <div className={styles.body}>
                    <h1 className={`${styles.title} h3`}>Нет проходки</h1>
                    <p className={styles.description}>Для использования аккаунта приобретите доступ на сервер</p>
                </div>
                <Button text='Купить проходку' color='accent' onClick={() => store.sendMail(store.user.email)} />
            </section>
        )
    }
}

export default Alert