import styles from './NavigationTile.module.scss'

import cx from 'clsx'

import Navigation from '../Navigation/Navigation'
import { useEffect, useState } from 'react'

const NavigationTile = () => {
  const [isAppeared, setIsAppeared] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const bottomBorder =
        document.documentElement.scrollHeight - window.innerHeight - 250

      setIsAppeared(window.scrollY > 50 && window.scrollY < bottomBorder)
    })
  }, [])

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
