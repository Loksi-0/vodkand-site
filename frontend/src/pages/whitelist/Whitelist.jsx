import { useContext, useState } from 'react'
import styles from './Whitelist.module.scss'
import Button from '@/global-components/Button/Button'
import { Context } from '@/main'
import Preloader from '@/global-components/Preloader/Preloader'

const Whitelist = () => {
    const { store } = useContext(Context)

    const [loading, setLoading] = useState(false)
    const [nick, setNick] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        const whitelistResult = await fetch(`http://65.108.227.231:25491/v1/whitelist?username=${nick}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'accept': '*/*',
                    'Authorization': import.meta.env.VITE_MINECRAFT_API_KEY
                }
            })

        const data = await whitelistResult.json()

        if (whitelistResult.ok) {
            const result = await store.changeNickname(nick, store.user.email)

            if (result.statusText === 'OK') {
                setLoading(false)
                window.location.href = '/'
            } else {
                setLoading(false)
                setError(result)
            }
        } else {
            setLoading(false)
            setError(data.error)
        }
    }

    return (
        <main>
            <section className={`${styles.whitelist} container`}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={`${styles.title} h3`}>Отлично! Теперь добавьте свой ник в вайтлист</h1>
                    <div className={styles.form__body}>
                        <div className={styles.input}>
                            <img 
                                className={styles.input__icon}
                                src={nick ? `https://mineskin.eu/helm/${nick}` : `https://mineskin.eu/helm/null`}
                                alt=''
                                width={50} height={50}
                                loading='lazy'
                                draggable='false'
                            />
                            <input 
                                className={styles.input__field}
                                type='text'
                                placeholder='nagibator777'
                                value={nick}
                                onChange={(e) => setNick(e.target.value.trim().replace(/[^a-zA-Z0-9_]/g, ''))}
                                required
                            />
                            {error && <p className={styles.error}>{error}</p>}
                        </div>
                        <p className={`${styles.disclaimer} gray-text`}>Потом поменять ник нельзя. Если вы неправильно вписали ник, обратитесь к администратору</p>
                    </div>
                    <Button 
                        className={styles.button}
                        type='submit'
                        color='accent'
                    >
                        {!loading ? 'Готово' : <Preloader size={27} />}
                    </Button>
                </form>
            </section>
        </main>
    )
}

export default Whitelist