import styles from './Header.module.scss'

import cx from 'clsx'

import Logo from '../Logo/Logo'
import { observer } from 'mobx-react-lite'
import SwitchTheme from '../SwitchTheme/SwitchTheme'
import AccountButton from '../AccountButton/AccountButton'
import TopLoader from '../TopLoader/HeaderLoader/HeaderLoader'

const Header = observer((props) => {
  const { sticky = true, ref } = props

  return (
    <header
      className={cx(styles.header, { [styles.sticky]: sticky })}
      ref={ref}
    >
      <div className={cx(styles.header__inner, 'container-big')}>
        <Logo />
        <div className={styles.header__right}>
          <SwitchTheme />
          <AccountButton />
        </div>
      </div>
      <TopLoader />
    </header>
  )
})

export default Header
