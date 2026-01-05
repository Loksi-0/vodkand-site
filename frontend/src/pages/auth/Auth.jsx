import styles from './Auth.module.scss'

import { useContext, useEffect, useState } from 'react'
import Button from '@/global-components/Button/Button'
import mail from '@/assets/icons/mail.svg'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router'
import usePageMetadata from '@/usePageMetadata'
import Header from '@/global-components/Header/Header'
import GoogleButton from '@/global-components/GoogleButton/GoogleButton'

const Auth = observer(() => {
  const url = import.meta.env.VITE_API_URL

  const navigate = useNavigate()

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

  useEffect(() => {
    if (!isActivated) {
      return
    }

    window.location.replace('/account')
  }, [isActivated])

  const isEmailValid = (email) => {
    email = email.trim().split('')

    if (!email.includes('@')) {
      return false
    }

    email = email.join().split('@')

    if (email.length !== 2 || !email[1].split('').includes('.')) {
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
    try {
      await store.login(email, password)

      navigate('/account', { replace: true })
    } catch (e) {
      setError(e.response?.data?.message)
    }

    setIsLoading(false)
  }

  const handleRegistration = async (email, password) => {
    try {
      await store.registration(email, password)

      localStorage.setItem('isActivated', 'pending')
      setPage(2)
    } catch (e) {
      setError(e.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)

    if (!isEmailValid(email)) {
      setEmailInput(`${styles.input} ${styles.invalid}`)
      setError('Почта указана неверно')
      setIsLoading(false)
      return
    }

    setEmailInput(styles.input)

    if (!isPasswordValid(password)) {
      setPasswordInput(`${styles.input} ${styles.invalid}`)
      setError('Длина пароля от 6 до 24 символов')
      setIsLoading(false)
      return
    }

    setEmailInput(styles.input)
    setPasswordInput(styles.input)
    setError('')

    fetch(`${url}/user?email=${email}`)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          handleLogin(email, password)
        } else {
          handleRegistration(email, password)
        }
      })
      .catch(() => {
        setError('Непредвиденная ошибка')
      })
  }

  const handeEmailInvalid = (event) => {
    event.preventDefault()

    const isEmpty = email.trim() === '' ? true : false
    setEmailInput(`${styles.input} ${styles.invalid}`)

    if (isEmpty) {
      setError('Заполните выделенные поля')
    }
  }

  const handlePasswordInvalid = (event) => {
    event.preventDefault()

    const isEmpty = password.trim() === '' ? true : false
    const isLengthInvalid = password.trim() > 24 || password.trim() < 6
    setPasswordInput(`${styles.input} ${styles.invalid}`)

    if (isEmpty) {
      setError('Заполните выделенные поля')
    } else if (isLengthInvalid) {
      setError('Длина пароля от 6 до 24 символов')
    }
  }

  usePageMetadata({
    title: 'Авторизация',
    index: false,
    follow: false
  })

  return (
    <>
      {page !== 2 && <Header />}
      <main>
        <section className={`${styles.auth} container`}>
          <h1 className='visually-hidden'>Зарегистрироваться или войти</h1>
          {page === 1 && (
            <div className={styles.registration}>
              <h2 className={`${styles.title} h3`}>
                Войти или зарегистрироваться
              </h2>
              <div className={styles.registration__body}>
                <GoogleButton />
                <p className={styles.registration__bodyOr}>или</p>
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                  <input
                    className={emailInput}
                    type='email'
                    placeholder='example@email.com'
                    name='email'
                    title=''
                    inputMode='email'
                    onInvalid={handeEmailInvalid}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailInput(styles.input)
                      setError('')
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
                      minLength={6}
                      maxLength={24}
                      value={password}
                      onInvalid={handlePasswordInvalid}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setPasswordInput(styles.input)
                        setError('')
                      }}
                      required
                    />
                    <Button
                      color='icon'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <div className={styles.showPasswordIcon}>
                        {showPassword ? (
                          <svg
                            width='800px'
                            height='800px'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5'
                              stroke='#000000'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        ) : (
                          <svg
                            width='800px'
                            height='800px'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z'
                              stroke='#000000'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z'
                              stroke='#000000'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        )}
                      </div>
                    </Button>
                  </div>
                  <p
                    className={`${styles.error} ${error === '' && styles.empty}`}
                  >
                    {error}
                  </p>
                  <Button
                    type='submit'
                    color='accent'
                    loading={isLoading}
                  >
                    Продолжить
                  </Button>
                  <p className={styles.disclaimer}>
                    Нажимая &quot;Продолжить&quot;, вы принимаете{' '}
                    <Link
                      className={styles.disclaimer__link}
                      to='/legal/privacy-policy'
                    >
                      Пользовательское соглашение
                    </Link>{' '}
                    и{' '}
                    <Link
                      className={styles.disclaimer__link}
                      to='/legal/privacy-policy'
                    >
                      Политику конфиденциальности
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          )}
          {page === 2 && !isActivated && (
            <div className={styles.mail}>
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
                  Мы отправили письмо для подтверждения на почту{' '}
                  <span className={styles.mailAccent}>{email}</span>
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
            </div>
          )}
        </section>
      </main>
    </>
  )
})

export default Auth
