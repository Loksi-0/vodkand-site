import styles from './NavigationTile.module.scss'

import cx from 'clsx'

import Navigation from '@/shared/ui/Navigation/Navigation'
import useAppear from '@/shared/ui/NavigationTile/useAppear'

const NavigationTile = () => {
  const { isAppeared } = useAppear()

  return (
    <div className={cx(styles.wrapper, { [styles.appeared]: isAppeared })}>
      <div className={styles.tile}>
        <Navigation
          tabFocus={false}
          usedInTile
        />
      </div>
    </div>
  )
}

export default NavigationTile
