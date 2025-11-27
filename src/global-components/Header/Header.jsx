import Logo from '../Logo/Logo'
import styles from './Header.module.scss'

const Header = (props) => {
    const { sticky = true } = props

    return (
        <header className={`${styles.header} ${sticky && styles.header__sticky}`}>
            <div className={`${styles.header__inner} container-big`}>
                <Logo />
                <a 
                    className={styles.accountButton}
                    href='/account'
                    draggable='false'
                >
                    <span className='visually-hidden'>Account</span>
                </a>
            </div>
        </header>
    )
}

export default Header