import styles from './Punishments.module.scss'

import { useContext, useEffect, useState } from 'react'

import mute from '@/assets/icons/mute.png'
import warn from '@/assets/icons/warn.png'
import ban from '@/assets/icons/ban.png'
import { Context } from '@/main'
import Preloader from '@/global-components/Preloader/Preloader'

const Punishments = () => {
    const { store } = useContext(Context)

    const [loading, setLoading] = useState(false)
    const [punishments, setPunishments] = useState([])
    const [isPoshalko, setIsPoshalko] = useState(Math.random(Date.now()) < 0.01)

    useEffect(() => {
        setLoading(true)

        fetch(`${import.meta.env.VITE_API_URL}/minecraftapi/punishments?username=${store.user.nickname}`)
            .then(response => response.json())
            .then(data => { 
                setLoading(false)
                setPunishments(data) 
            })
            .catch(e => console.log(e))
    }, [])

    const date = (seconds) => {
        let d = new Date(1970, 0, 1)
        d.setUTCSeconds(seconds)
        d = d.toLocaleDateString('ru-RU')

        return d
    }

    return (
        <section className={styles.punishments}>
            <h2 className='h3'>Наказания</h2>
            <ul className={`${styles.punishmentsList} ${loading && styles.loading} ${!punishments[0] && !loading && (isPoshalko ? styles.poshalko : styles.empty)}`}>
                {loading &&
                    <Preloader size={50} />
                }
                {!loading && punishments.map((element, index) => {
                    return (
                        <li key={index} 
                            className={styles.punishmentsList__item}
                        >
                            <div className={`${styles.punishmentsList__iconWrapper} 
                                ${(element.type === 'WARN' && styles.warn) 
                                || (element.type === 'BAN' && styles.ban) 
                                || (element.type === 'MUTE' && styles.mute)}
                            `}>
                                <img 
                                    className={styles.punishmentsList__icon}
                                    src={(element.type === 'WARN' && warn) 
                                        || (element.type === 'BAN' && ban) 
                                        || (element.type === 'MUTE' && mute)}
                                    alt=''
                                    loading='lazy'
                                    draggable='false'
                                />
                            </div>
                            <div className={styles.punishmentsList__body}>
                                <h3 className='h4'>
                                    {(element.type === 'WARN' && 'Предупреждение') 
                                    || (element.type === 'BAN' && 'Бан') 
                                    || (element.type === 'MUTE' && 'Мут')}
                                </h3>
                                <p className={styles.punishmentsList__reason}>{element.reason}</p>
                                <p className={styles.punishmentsList__expires}>
                                    Срок действия: {element.endDate !== 0 ? `до ${date(element.endDate)}` : 'Навсегда'}
                                </p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Punishments