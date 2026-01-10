import styles from './Hero.module.scss'

import cx from 'clsx'

import Button from '@/global-components/Button/Button'
import Title from '../Title/Title'
import CopyField from '@/global-components/CopyField/CopyField'
import PunishmentAlert from '@/global-components/PunishmentAlert/PunishmentAlert'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'

const Hero = observer(() => {
  const { store } = useContext(Context)

  const navigate = useNavigate()

  const [width, setWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767)

  window.addEventListener('resize', () => setWidth(window.innerWidth))

  useEffect(() => {
    setIsMobile(window.innerWidth < 767)
  }, [width])

  const buttonHref = () => {
    if (!store.isAuth) {
      return '/auth'
    }
    if (!store.user?.isActivated) {
      return '/account'
    }
    if (!store.user?.hasPass) {
      return '/payment'
    }
    if (!store.user?.nickname) {
      return '/whitelist'
    }
    if (store.user?.nickname) {
      return '/account'
    }
    return
  }

  return (
    <section className={cx(styles.hero, 'container-big')}>
      {isMobile && (
        <div className={styles.hero__alertWrapper}>
          <PunishmentAlert />
        </div>
      )}
      <header className={styles.hero__header}>
        <Title />
        <p className={styles.hero__description}>
          Forever world с неограниченными возможностями для творчества
        </p>
      </header>
      <div className={styles.hero__body}>
        {!isMobile && <PunishmentAlert />}
        <div className={styles.hero__content}>
          <Button
            color='accent'
            isBig
            disabled={store.isLoading}
            onClick={() => {
              navigate(buttonHref())
            }}
          >
            Купить проходку
          </Button>
          <CopyField
            text='play.vodkand.online'
            subtitle='1.21.11'
          />
        </div>
      </div>
    </section>
  )
})

export default Hero
