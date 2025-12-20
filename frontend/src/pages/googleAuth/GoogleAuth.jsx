import Button from '@/global-components/Button/Button'
import styles from './GoogleAuth.module.scss'

import Preloader from '@/global-components/Preloader/Preloader'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/main'
import { useLocation, useNavigate } from 'react-router'

const GoogleAuth = () => {
    const { store } = useContext(Context)

    const location = useLocation()
    const navigate = useNavigate()

    const [error, setError] = useState('')

    useEffect(() => {
        const auth = async () => {
            const query = new URLSearchParams(location.search)
            const tempCode = query.get('code')
            const error = query.get('error')

            if (error) {
                const isAccessDenied = error === 'access_denied'
                setError(isAccessDenied 
                    ? 'Вы отменили вход через Google' 
                    : `Не удалось выполнить вход с Google. ${error}`
                )
                return
            }

            const result = await store.googleAuth(tempCode)

            if (result.statusText === 'OK') {
                navigate('/account')
            } else {
                const error = await result.text()
                setError(error)
            }
        }

        auth()
    }, [])

    return (
        <main className={`${styles.main} container`}>
            {error 
                ? <div className={styles.error}>
                    <h1 className='h4'>{error}</h1>
                    <Button color='accent' onClick={() => navigate('/auth')}>
                        Вернуться на страницу входа
                    </Button>
                </div>
                : <Preloader size='100px' />
            }
        </main>
    )
}

export default GoogleAuth