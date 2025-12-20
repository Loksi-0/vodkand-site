import Logo from '@/global-components/Logo/Logo'
import Navigation from '@/global-components/Navigation/Navigation'
import Soc1als from '@/global-components/Soc1als/Soc1als'
import styles from './Footer.module.scss'
import Legal from '@/global-components/Legal/Legal'

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
                        <Soc1als 
                            links={[
                                {
                                    title: 'Discord',
                                    link: 'https://discord.gg/wQPsxX79',
                                }
                            ]}
                        />
                    </div>
                </header>
                <div className={styles.bottomRow}>
                    <div className={`${styles.mobileRow} visible-mobile`}>
                        <Logo />
                        <Soc1als 
                            links={[
                                {
                                    title: 'Discord',
                                    link: 'https://discord.gg/wQPsxX79',
                                }
                            ]}
                        />
                    </div>
                    <Legal />
                    <p className={styles.disclaimer}>
                        Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang Synergies AB, Microsoft Corporation or other rightsholders.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer