import styles from './Hero.module.scss'

import cx from 'clsx'

import Title from '@/shared/ui/Title'
import CopyField from '@/shared/ui/CopyField'
import PunishmentAlert from '@/features/punishment-alert'
import Glow from '@/shared/ui/Glow/Glow'
import OrderButton from '@/shared/ui/OrderButton'

const Hero = () => {
  let isMobile = false

  if (typeof window !== 'undefined') {
    isMobile = window.innerWidth < 767
  }

  return (
    <section className={cx(styles.hero, 'container-big')}>
      <Glow
        size='medium'
        color='accent'
        className={styles.hero__glow}
      />
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
          <OrderButton
            product='pass'
            isBig
          >
            Купить проходку
          </OrderButton>
          <CopyField
            text='play.vodkand.online'
            subtitle='1.21.11'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
