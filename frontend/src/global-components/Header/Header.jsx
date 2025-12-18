import styles from './Header.module.scss'

import Logo from '../Logo/Logo'
import { observer } from 'mobx-react-lite'
import SwitchTheme from '../SwitchTheme/SwitchTheme'
import AccountButton from '../AccountButton/AccountButton'

const Header = (props) => {
    const { sticky = true, ref } = props

    return (
        <header className={`${styles.header} ${sticky && styles.header__sticky}`} ref={ref}>
            <div className={`${styles.header__inner} container-big`}>
                <Logo />
                <div className={styles.rightContainer}>
                    <SwitchTheme />
                    <AccountButton />
                </div>
            </div>
        </header>
    )
}

export default observer(Header)