import styles from './NavigationTile.module.scss'

import Navigation from "../Navigation/Navigation"
import { useEffect, useState } from 'react'

const NavigationTile = () => {
    const [isAppeared, setIsAppeared] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const bottomBorder = document.documentElement.scrollHeight - window.innerHeight - 250

            setIsAppeared((window.scrollY > 50 && window.scrollY < bottomBorder))
        })
    }, [])

    return (
        <div className={`${styles.wrapper} ${isAppeared && styles.appeared}`}>
            <div className={styles.tile}>
                <Navigation 
                    tabFocus={false}
                />
            </div>
        </div>
    )
}

export default NavigationTile