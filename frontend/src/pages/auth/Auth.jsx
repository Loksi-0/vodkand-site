import styles from './Auth.module.scss'

import { useContext, useState } from 'react'
import Button from "@/global-components/Button/Button"
import mail from '@/assets/icons/mail.svg'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router'
import Preloader from '@/global-components/Preloader/Preloader'

const Auth = () => {
    const url = import.meta.env.VITE_API_URL

    const [page, setPage] = useState(1)
    const [email, setEmail] = useState('')
    const [emailInput, setEmailInput] = useState(styles.input)
    const [password, setPassword] = useState('')
    const [passwordInput, setPasswordInput] = useState(styles.input)
    const [error, setError] = useState('')
    const [isActivated, setIsActivated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { store } = useContext(Context)

    window.addEventListener('storage', () => {
        const item = localStorage.getItem('isActivated')

        if (item) {
            setIsActivated(true)
        }
    })

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
            setIsLoading(false)
            window.location.href = '/account'
        } else {
            setError(result)
        }
    }

    const handleRegistration = async (email, password) => {
        const result = await store.registration(email, password)

        if (result.statusText === 'OK') {
            setIsLoading(false)
            setPage(2)
        } else {
            setError(result)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)

        if(!isEmailValid(email)) {
            setEmailInput(`${styles.input} ${styles.invalid}`)
            setError('Почта указана неверно')
            setIsLoading(false)
            return
        }

        setEmailInput(styles.input)

        if(!isPasswordValid(password)) {
            setPasswordInput(`${styles.input} ${styles.invalid}`)
            setError('Длина пароля от 6 до 24 символов')
            setIsLoading(false)
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
                                name='email'
                                title=''
                                inputMode='email'
                                onInvalid={(event) => {
                                    event.preventDefault()
                                    setEmailInput(`${styles.input} ${styles.invalid}`)
                                }}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailInput(styles.input)
                                }}
                                required
                            />
                            <div className={styles.passwordInputWrapper}>
                                <input 
                                    className={passwordInput}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Пароль'
                                    name='password'
                                    title=''
                                    value={password}
                                    onInvalid={(event) => {
                                        event.preventDefault()
                                        setPasswordInput(`${styles.input} ${styles.invalid}`)
                                    }}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setPasswordInput(styles.input)
                                    }}
                                    required
                                />
                                <Button 
                                    color='icon'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <div className={styles.showPasswordIcon}>
                                        {showPassword
                                        ? <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        : <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        }
                                    </div>
                                </Button>
                            </div>
                            <p className={`${styles.error} ${error === '' && styles.empty}`}>
                                {error}
                            </p>
                            <Button
                                type='submit'
                                color='accent'
                            >
                                {isLoading 
                                    ? <Preloader size={27} />
                                    : 'Продолжить'
                                }
                            </Button>
                        </div>
                    </div>
                </form>
                }
                {page === 2 && 
                (isActivated
                ? <Navigate to='/' />
                : <div className={styles.mail}>
                    <div className={styles.mail__iconWrapper}>
                        <img 
                            className={styles.mail__icon}
                            src={mail}
                            alt=''
                            draggable='false'
                        />
                    </div>
                    <div className={styles.mail__body}>
                        <h2 className={styles.mail__title}>Проверьте почту</h2>
                        <p className={styles.mail__description}>
                            Мы отправили письмо для подтверждения на почту <span className={styles.mailAccent}>{email}</span>
                        </p>
                        <div className={styles.mail__button}>
                            <Button
                                onClick={() => store.sendMail(email)}
                                color='transparentDark'
                            >
                                Отправить еще раз
                            </Button>
                        </div>
                    </div>
                </div>)
                }
            </section>
        </main>
    )
}

export default observer(Auth)