import Logo from '../Logo/Logo'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`${styles.header__inner} container-big`}>
                <Logo />
                <a 
                    className={styles.accountButton}
                    href='/'
                    draggable='false'
                >
                    <span className='visually-hidden'>Account</span>
                </a>
            </div>
        </header>
    )
}

export default Header