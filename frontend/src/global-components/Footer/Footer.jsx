import styles from './Footer.module.scss'

import Logo from '@/global-components/Logo/Logo'
import Navigation from '@/global-components/Navigation/Navigation'
import Soc1als from '@/global-components/Soc1als/Soc1als'
import Legal from '@/global-components/Legal/Legal'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__inner} container-big`}>
        <header className={styles.row}>
          <div className='hidden-mobile'>
            <Logo />
          </div>
          <Navigation />
          <div className={`${styles.soc1als} hidden-mobile`}>
            <Soc1als />
          </div>
        </header>
        <div className={styles.bottomRow}>
          <div className={`${styles.mobileRow} visible-mobile`}>
            <Logo />
            <Soc1als />
          </div>
          <Legal />
          <Link
            to='/legal/copyright'
            className={styles.copyright}
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
