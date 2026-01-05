import styles from './Account.module.scss'

import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'
import Nick from './components/Nick/Nick'
import Punishments from './components/Punishments/Punishments'
import Buttons from './components/Buttons/Buttons'
import { useContext, useCallback, useState } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import Alert from './components/Alert/Alert'
import usePageMetadata from '@/usePageMetadata'
import { useNavigate } from 'react-router'

const Account = observer(() => {
  const { store } = useContext(Context)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)

      await store.logout()

      setIsLoading(false)
    } catch (e) {
      console.error(e.response?.data?.message)
    }
  }

  const handleSendMail = useCallback(() => {
    if (store.user?.email) {
      store.sendMail(store.user.email)
    }
  }, [store])

  const handleBuyPass = useCallback(() => {
    navigate('/payment')
  }, [store])

  const handleAddNick = useCallback(() => {
    navigate('/whitelist')
  }, [store])

  usePageMetadata({
    title: store.user?.nickname
      ? `Аккаунт | ${store.user.nickname}`
      : 'Аккаунт',
    index: false,
    follow: false
  })

  return (
    <>
      <Header />
      <main className={`${styles.account} container`}>
        {!store.user?.isActivated &&
          localStorage.getItem('isActivated') !== 'true' &&
          !store.isLoading && (
            <Alert
              color='yellow'
              title='Активируйте аккаунт'
              description='Активируйте аккаунт по ссылке, которая пришла на почту. Без активации аккаунта вы не сможете купить проходку'
              onClick={handleSendMail}
              textButton='Отправить письмо еще раз'
              disclaimer
            />
          )}
        {store.user?.isActivated &&
          !store.user?.hasPass &&
          !store.isLoading && (
            <Alert
              color='red'
              title='Купите проходку'
              description='Для использования аккаунта приобретите проходку'
              onClick={handleBuyPass}
              textButton='Купить проходку'
              disclaimer
            />
          )}
        {store.user?.isActivated &&
          store.user?.hasPass &&
          !store.user?.nickname &&
          !store.isLoading && (
            <Alert
              color='yellow'
              title='Добавьте ник в вайтлист'
              description='Сейчас вы не сможете зайти на сервер. Чтобы получить доступ, добавьте свой ник в вайтлист'
              onClick={handleAddNick}
              textButton='Добавить ник'
            />
          )}
        {store.user?.isActivated &&
          store.user?.hasPass &&
          store.user?.nickname &&
          !store.isLoading && (
            <>
              <Nick />
              <Punishments />
              <Buttons
                onLogout={handleLogout}
                loading={isLoading}
              />
            </>
          )}
      </main>
      <Footer />
    </>
  )
})

export default Account
