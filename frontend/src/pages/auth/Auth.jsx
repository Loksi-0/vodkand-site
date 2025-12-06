import styles from './Auth.module.scss'

import { useContext, useState } from 'react'
import Button from "@/global-components/Button/Button"
import mail from '@/assets/icons/mail.svg'
import frog from '@/assets/images/frog.png'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'

const Auth = () => {
    const url = import.meta.env.VITE_API_URL

    const [page, setPage] = useState(1)
    const [email, setEmail] = useState('')
    const [emailInput, setEmailInput] = useState(styles.input)
    const [password, setPassword] = useState('')
    const [passwordInput, setPasswordInput] = useState(styles.input)
    const [error, setError] = useState('')

    const { store } = useContext(Context)

    const isEmailValid = (email) => {
        email = email.trim().split('')

        if (!email.includes('@')) {
            return false
        }

        email = email.join().split('@')

        if(email.length !== 2 || !email[1].split('').includes('.')) {
            return false
        }

        return true
    }

    const isPasswordValid = (password) => {
        password = password.trim()
        
        if (password.length < 6 || password.length > 24) {
            return false
        }

        return true
    }

    const handleLogin = async (email, password) => {
        const result = await store.login(email, password)

        if (result.statusText === 'OK') {
            window.location.href = '/account'
        } else {
            setError(result)
        }
    }

    const handleRegistration = async (email, password) => {
        const result = await store.registration(email, password)

        if (result.statusText === 'OK') {
            setPage(2)
        } else {
            setError(result)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(!isEmailValid(email)) {
            setEmailInput(`${styles.input} ${styles.invalid}`)
            setError('Почта указана неверно')
            return
        }

        if(!isPasswordValid(password)) {
            setPasswordInput(`${styles.input} ${styles.invalid}`)
            setError('Длина пароля от 6 до 24 символов')
            return
        }

        setEmailInput(styles.input)
        setPasswordInput(styles.input)
        setError('')

        fetch(`${url}/users`)
            .then(response => response.json())
            .then(json => {
                if (json.some(e => e.email === email)) {
                    handleLogin(email, password)
                    return
                }

                handleRegistration(email, password)
                return
            })
            .catch(e => {
                setError('Непредвиденная ошибка')
            })
    }

    return (
        <main>
            <section className={`${styles.auth} container`}>
                <h1 className='visually-hidden'>Зарегистрироваться или войти</h1>
                {page === 1 && 
                <form 
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.form__content}>
                        <h2 className={`${styles.title} h3`}>Войти или зарегистрироваться</h2>
                        <div className={styles.form__body}>
                            <input 
                                className={emailInput}
                                type='email' 
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input 
                                className={passwordInput}
                                type='password' 
                                placeholder='Пароль'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className={styles.error}>{error}</p>
                        </div>
                        <Button
                            type='submit'
                            text='Продолжить'
                            color='accent'
                        />
                    </div>
                    <img 
                        className={`${styles.form__image} hidden-mobile`}
                        src={frog}
                        alt=''
                        loading='lazy'
                        draggable='false' 
                    />
                </form>
                }
                {page === 2 && 
                <div className={styles.mail}>
                    <img 
                        className={styles.mail__icon}
                        src={mail}
                        alt=''
                        draggable='false'
                    />
                    <div className={styles.mail__body}>
                        <h2 className={styles.mail__title}>Проверьте почту</h2>
                        <p className={styles.mail__description}>Перейдите по ссылке из письма, которое вам пришло</p>
                    </div>
                </div>
                }
            </section>
        </main>
    )
}

export default observer(Auth)