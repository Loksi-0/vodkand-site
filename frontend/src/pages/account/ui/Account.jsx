import styles from './Account.module.scss'

import cx from 'clsx'

import { Nick, Punishments, Alert, Buttons } from '@/features/account-page'
import { useContext } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { observer } from 'mobx-react-lite'
import usePageMetadata from '@/shared/hooks/usePageMetadata.js'
import useAccount from '../model/useAccount'
import PageLayout from '@/app/layouts/PageLayout'

const Account = observer(() => {
  const { userStore } = useContext(MainContext)

  const {
    handleLogout,
    handleSendMail,
    handleBuyPass,
    handleAddNick,
    isLoading
  } = useAccount()

  usePageMetadata({
    title: userStore.user?.nickname
      ? `Аккаунт | ${userStore.user.nickname}`
      : 'Аккаунт',
    index: false,
    follow: false
  })

  return (
    <PageLayout className={cx(styles.account, 'container')}>
      {!userStore.user?.isActivated &&
        localStorage.getItem('isActivated') !== 'true' &&
        !userStore.isLoading && (
          <Alert
            color='yellow'
            title='Активируйте аккаунт'
            description='Активируйте аккаунт по ссылке, которая пришла на почту. Без активации аккаунта вы не сможете купить проходку'
            onClick={handleSendMail}
            textButton='Отправить письмо еще раз'
            disclaimer
          />
        )}
      {userStore.user?.isActivated &&
        !userStore.user?.hasPass &&
        !userStore.isLoading && (
          <Alert
            color='red'
            title='Купите проходку'
            description='Для использования аккаунта приобретите проходку'
            onClick={handleBuyPass}
            textButton='Купить проходку'
            disclaimer
          />
        )}
      {userStore.user?.isActivated &&
        userStore.user?.hasPass &&
        !userStore.user?.nickname &&
        !userStore.isLoading && (
          <Alert
            color='yellow'
            title='Добавьте ник в вайтлист'
            description='Сейчас вы не сможете зайти на сервер. Чтобы получить доступ, добавьте свой ник в вайтлист'
            onClick={handleAddNick}
            textButton='Добавить ник'
          />
        )}
      {userStore.user?.isActivated &&
        userStore.user?.hasPass &&
        userStore.user?.nickname &&
        !userStore.isLoading && (
          <>
            <Nick />
            <Punishments />
            <Buttons
              onLogout={handleLogout}
              loading={isLoading}
            />
          </>
        )}
    </PageLayout>
  )
})

export default Account
