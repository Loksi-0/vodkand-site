import styles from './PunishmentAlert.module.scss'

import mute from '@/assets/icons/mute.png'
import warn from '@/assets/icons/warn.png'
import ban from '@/assets/icons/ban.png'

import { useState, useContext, useEffect } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'

const PunishmentAlert = () => {
    const { store } = useContext(Context)
    const [punishment, setPunishment] = useState(null)

    useEffect(() => {
        if (!store.user?.nickname) {
            return
        }

        const getPunishments = async () => {
            try {
                const response = await store.getPunishments(store.user?.nickname)

                setPunishment(response.data[0])
            } catch(e) {
                console.error(e.response?.data?.message)
            }
        }

        getPunishments()
    }, [store.user?.nickname])

    const date = (seconds) => {
        let d = new Date(1970, 0, 1)
        d.setUTCSeconds(seconds)
        d = d.toLocaleDateString('ru-RU')

        return d
    }

    if (punishment) {
        return (
            <div className={styles.alerts}>
                <div 
                    className={styles.alert}
                >
                    <div className={`${styles.alert__iconWrapper} 
                        ${(punishment.type === 'WARN' && styles.warn) 
                        || (punishment.type === 'BAN' && styles.ban) 
                        || (punishment.type === 'MUTE' && styles.mute)}`}>
                        <img 
                            className={styles.alert__icon}
                            src={(punishment.type === 'WARN' && warn) 
                                || (punishment.type === 'BAN' && ban) 
                                || (punishment.type === 'MUTE' && mute)}
                            alt=''
                            draggable='false'
                            loading='lazy'
                        />
                    </div>
                    <div className={styles.alert__body}>
                        <h4 className={styles.alert__title}>
                            {(punishment.type === 'WARN' && 'Предупреждение') 
                            || (punishment.type === 'BAN' && 'Бан') 
                            || (punishment.type === 'MUTE' && 'Мут')}
                        </h4>
                        <p className={styles.alert__reason}>{punishment.reason}</p>
                        <p className={`${styles.alert__duration} gray-text`}>
                            {punishment.endDate !== 0 ? `до ${date(punishment.endDate)}` : 'Навсегда'}
                        </p>
                    </div>
                </div>
            </div>
        )
    } else {
        return
    }
}

export default observer(PunishmentAlert)