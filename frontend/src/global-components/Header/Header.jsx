import { useContext } from 'react'
import Logo from '../Logo/Logo'
import styles from './Header.module.scss'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import accountIcon from '@/assets/icons/account.svg'

const Header = (props) => {
    const { sticky = true } = props

    const { store } = useContext(Context)

    return (
        <header className={`${styles.header} ${sticky && styles.header__sticky}`}>
            <div className={`${styles.header__inner} container-big`}>
                <Logo />
                <a 
                    className={styles.accountLink}
                    href={store.isAuth ? '/account' : '/auth'}
                    draggable='false'
                >
                    <img 
                        className={styles.accountIcon}
                        src={store.user.nickname ? `https://mineskin.eu/helm/${store.user.nickname}` : accountIcon}
                        alt=''
                        loading='lazy'
                        draggable='false'
                    />
                    <span className='visually-hidden'>Аккаунт</span>
                </a>
            </div>
        </header>
    )
}

export default observer(Header)