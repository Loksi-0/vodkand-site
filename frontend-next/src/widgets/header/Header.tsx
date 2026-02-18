'use client'

import styles from './Header.module.scss'

import cx from 'clsx'

import Logo from '@/shared/ui/Logo'
import { observer } from 'mobx-react-lite'
import SwitchTheme from '@/features/switch-theme'
import AccountButton from '@/features/account-button'
import TopLoader from '@/features/set-top-loader/HeaderLoader/HeaderLoader'
import { RefObject } from 'react'

type HeaderProps = {
  sticky?: boolean
  ref?: RefObject<HTMLElement | null>
}

const Header = observer((props: HeaderProps) => {
  const { sticky = true, ref = null } = props

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
