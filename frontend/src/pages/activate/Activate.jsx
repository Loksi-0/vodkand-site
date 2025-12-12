import styles from './Activate.module.scss'

import Button from "@/global-components/Button/Button"
import { useEffect, useState } from "react"
import { Link } from 'react-router'
import ok from '@/assets/icons/ok.svg'
import error from '@/assets/icons/error.svg'

const Activate = () => {
    const url = import.meta.env.VITE_API_URL

    const [title, setTitle] = useState('Выполняется активация...')
    const [status, setStatus] = useState('waiting')
    const [preloaderIcon, setPreloaderIcon] = useState(null)
    const [preloader, setPreloader] = useState(styles.preloader)

    useEffect(() => {
        const activationLink = new URLSearchParams(window.location.search).get('link')

        fetch(`${url}/activate/${activationLink}`)
            .then(() => {
                localStorage.setItem('isActivated', true)
                setTitle('Активация прошла успешно')
                setPreloader(`${styles.preloader} ${styles.ok}`)
                setPreloaderIcon(ok)
                setStatus('ok')
            })
            .catch(e => {
                setTitle(`Произошла ошибка. ${e.message}`)
                setPreloader(`${styles.preloader} ${styles.error}`)
                setPreloaderIcon(error)
                setStatus('error')
            })
    }, [])

    const handleClick = () => {
        location.reload()
    }

    return (
        <main>
            <section className={`${styles.activate} container`}>
                <div className={styles.preloader__wrapper}>
                    <div className={preloader}>
                        <img 
                            className={styles.icon}
                            src={preloaderIcon} 
                            alt='' 
                        />
                    </div>
                </div>
                <h1 className={`${styles.title} h3`}>{title}</h1>
                {status === 'waiting' && 
                    <div className={styles.preButton}></div>
                }
                {status === 'ok' && 
                    <Link to='/'>
                        <Button 
                            color='accent'
                        >
                            Вернуться на главную страницу
                        </Button>
                    </Link>
                }
                {status === 'error' && 
                    <Button 
                        color='red'
                        onClick={handleClick}
                    >
                        Попробовать снова
                    </Button>
                }
            </section>
        </main>
    )
}

export default Activate