import styles from './Account.module.scss'

import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'
import Nick from './components/Nick/Nick'
import Punishments from './components/Punishments/Punishments'
import Buttons from './components/Buttons/Buttons'
import { useContext } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import Alert from './components/Alert/Alert'

const Account = () => {
    const { store } = useContext(Context)

    const handleLogout = async () => {
        const result = await store.logout()

        if (!result.statusText === 'OK') {
            console.log(result)
        }
    }

    return (
        <>
            <Header />
            <main className={`${styles.account} container`}>
                {!store.user.isActivated && 
                    <Alert 
                        color='yellow' 
                        title='Аккаунт не активирован' 
                        description='активируйте аккаунт по ссылке в письме' 
                        onClick={() => store.sendMail(store.user.email)}
                        textButton='Отправить письмо еще раз'
                    />
                }
                {store.user.isActivated && !store.user.hasPass && 
                    <Alert 
                        color='red' 
                        title='Нет проходки' 
                        description='Для использования аккаунта приобретите доступ на сервер' 
                        onClick={() => {}}
                        textButton='Купить проходку'
                    />
                }
                {store.user.isActivated && store.user.hasPass && !store.user.nickname &&
                    <Alert 
                        color='red' 
                        title='Аккаунт не в вайтлисте' 
                        description='Сейчас вы не сможете зайти на сервер. Чтобы получить доступ, добавьте свой ник в вайтлист' 
                        onClick={() => window.location.href = '/whitelist'}
                        textButton='Добавить ник'
                    />
                }
                {store.user.isActivated && store.user.hasPass && store.user.nickname && 
                    <>
                        <Nick />
                        <Punishments />
                        <Buttons 
                            onLogout={handleLogout}
                        />
                    </>
                }
            </main>
            <Footer />
        </>
    )
}

export default observer(Account)