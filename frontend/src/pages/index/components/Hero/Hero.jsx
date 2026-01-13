import styles from './Hero.module.scss'

import cx from 'clsx'

import Button from '@/global-components/Button/Button'
import Title from '../Title/Title'
import CopyField from '@/global-components/CopyField/CopyField'
import PunishmentAlert from '@/global-components/PunishmentAlert/PunishmentAlert'
import { observer } from 'mobx-react-lite'
import useHero from '@/pages/index/components/Hero/useHero'

const Hero = observer(() => {
  const { isMobile, onClick, loading } = useHero()

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
            disabled={loading}
            onClick={onClick}
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
