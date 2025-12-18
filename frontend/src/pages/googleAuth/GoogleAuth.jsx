import Button from '@/global-components/Button/Button'
import styles from './GoogleAuth.module.scss'

import Preloader from '@/global-components/Preloader/Preloader'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/main'

const GoogleAuth = () => {
    const { store } = useContext(Context)

    const [error, setError] = useState('')

    useEffect(() => {
        const auth = async () => {
            const query = new URLSearchParams(window.location.search)
            const code = query.get('code')
            const state = query.get('state')

            if (!code || !state) {
                setError('отсутствует параметр code или state')
                return
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/auth/google/callback`, 
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            code,
                            state
                        })
                    })
                
                if (!response.ok) {
                    throw new Error(`Ошибка сервера. ${response.json()}`)
                }

                const data = await response.json()
                
                const { email, sub } = data
                const authResponse = await store.googleAuth(email, sub)

                if (authResponse.statusText === 'OK') {
                    window.location.href = '/account'
                } else {
                    setError(authResponse.statusText)
                }
            } catch(e) {
                setError(e.message)
            }
        }

        auth()
    }, [])

    return (
        <main className={`${styles.main} container`}>
            {error 
                ? <div className={styles.error}>
                    <h1 className='h4'>{error}</h1>
                    <Button color='accent' onClick={() => window.location.href = '/auth'}>
                        Вернуться на страницу входа
                    </Button>
                </div>
                : <Preloader size='100px' />
            }
        </main>
    )
}

export default GoogleAuth