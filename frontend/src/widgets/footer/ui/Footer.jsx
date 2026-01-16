import styles from './Footer.module.scss'

import cx from 'clsx'

import Logo from '@/shared/ui/Logo'
import Navigation from '@/shared/ui/Navigation'
import Soc1als from '@/shared/ui/Soc1als'
import Legal from '@/shared/ui/Legal'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={cx(styles.footer__inner, 'container-big')}>
        <header className={styles.footer__header}>
          <div className='hidden-mobile'>
            <Logo />
          </div>
          <Navigation />
          <div className={cx(styles.footer__soc1als, 'hidden-mobile')}>
            <Soc1als />
          </div>
        </header>
        <div className={styles.footer__content}>
          <div className={cx(styles.footer__contentMobile, 'visible-mobile')}>
            <Logo />
            <Soc1als />
          </div>
          <Legal />
          <Link
            to='/legal/copyright'
            className={styles.footer__copyright}
          >
            Minecraft — товарный знак Mojang Studios <br />
            &copy; Vodkand, {new Date().getFullYear()}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
