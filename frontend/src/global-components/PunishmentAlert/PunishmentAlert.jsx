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
        if (!store.user.nickname) {
            return
        }

        fetch(`http://65.108.227.231:25491/v1/libertybans/all?username=${store.user.nickname}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'accept': '*/*',
                'Authorization': import.meta.env.VITE_MINECRAFT_API_KEY
            }
        })
            .then(response => response.json())
            .then(data => { 
                setPunishment(data[0]) 
            })
            .catch(e => console.log(e))
    }, [store.user.nickname])

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
                    className={
                        `${styles.alert} 
                        ${(punishment.type === 'WARN' && styles.warn) 
                        || (punishment.type === 'BAN' && styles.ban) 
                        || (punishment.type === 'MUTE' && styles.mute)}`
                    }
                >
                    <img 
                        className={styles.alert__icon}
                        src={(punishment.type === 'WARN' && warn) 
                            || (punishment.type === 'BAN' && ban) 
                            || (punishment.type === 'MUTE' && mute)}
                        alt=''
                        draggable='false'
                        loading='lazy'
                    />
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