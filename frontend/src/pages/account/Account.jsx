import styles from './Account.module.scss'

import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'
import Nick from './components/Nick/Nick'
import Punishments from './components/Punishments/Punishments'
import Buttons from './components/Buttons/Buttons'
import { useContext, useCallback } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import Alert from './components/Alert/Alert'
import usePageMetadata from '@/usePageMetadata'
import { useNavigate } from 'react-router'

const Account = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()

    const handleLogout = async () => {
        const result = await store.logout()

        if (result.statusText !== 'OK') {
            console.log(result)
        }
    }

    const handleSendMail = useCallback(() => {
        if (store.user?.email) {
            store.sendMail(store.user.email)
        }
    }, [store])

    const handleBuyPass = useCallback(() => {}, [store])

    const handleAddNick = useCallback(() => {
        navigate('/whitelist')
    }, [store])

    usePageMetadata({
        title: store.user?.nickname ? `Аккаунт | ${store.user.nickname}` : 'Аккаунт',
        index: false,
        follow: false
    })

    return (
        <>
            <Header />
            <main className={`${styles.account} container`}>
                {!store.user?.isActivated && !store.isLoading && 
                    <Alert 
                        color='yellow' 
                        title='Аккаунт не активирован' 
                        description='активируйте аккаунт по ссылке в письме' 
                        onClick={handleSendMail}
                        textButton='Отправить письмо еще раз'
                    />
                }
                {store.user?.isActivated && !store.user?.hasPass && !store.isLoading && 
                    <Alert 
                        color='red' 
                        title='Нет проходки' 
                        description='Для использования аккаунта приобретите доступ на сервер' 
                        onClick={handleBuyPass}
                        textButton='Купить проходку'
                    />
                }
                {store.user?.isActivated && store.user?.hasPass && !store.user?.nickname && !store.isLoading &&
                    <Alert 
                        color='red' 
                        title='Аккаунт не в вайтлисте' 
                        description='Сейчас вы не сможете зайти на сервер. Чтобы получить доступ, добавьте свой ник в вайтлист' 
                        onClick={handleAddNick}
                        textButton='Добавить ник'
                    />
                }
                {store.user?.isActivated && store.user?.hasPass && store.user?.nickname && !store.isLoading && 
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