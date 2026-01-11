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
import usePaymentButton from '@/hooks/usePaymentButton'

const Hero = observer(() => {
  const { userStore } = useContext(Context)

  const navigate = useNavigate()
  const buttonHref = usePaymentButton()

  const [width, setWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  })

  useEffect(() => {
    setIsMobile(window.innerWidth < 767)
  }, [width])

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
            disabled={userStore.isLoading}
            onClick={() => {
              navigate(buttonHref)
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
