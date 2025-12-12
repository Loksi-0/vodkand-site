import styles from './Auth.module.scss'

import { useContext, useState } from 'react'
import Button from "@/global-components/Button/Button"
import mail from '@/assets/icons/mail.svg'
import show from '@/assets/icons/show.svg'
import hide from '@/assets/icons/hide.svg'
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
                                    <img 
                                        src={showPassword ? hide : show}
                                        alt=''
                                        width={30} height={30}
                                        loading='lazy'
                                        draggable='false'
                                    />
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