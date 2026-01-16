import styles from './Form.module.scss'

import cx from 'clsx'

import { Link } from 'react-router'
import Button from '@/shared/ui/Button'
import GoogleButton from '@/features/google-auth-button'
import { useContext } from 'react'
import { AuthContext } from '@/features/auth-page'

const Form = () => {
  const {
    handleSubmit,
    error,
    setError,
    invalidFields,
    setInvalidFields,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading
  } = useContext(AuthContext)

  return (
    <div className={styles.registration}>
      <h1 className={cx(styles.registration__title, 'h3')}>
        Войти или зарегистрироваться
      </h1>
      <div className={styles.registration__body}>
        <GoogleButton />
        <p className={styles.registration__or}>или</p>
        <form
          className={cx(styles.registration__form, styles.form)}
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className={cx(styles.form__input, {
              [styles.invalid]: invalidFields.includes('email')
            })}
            placeholder='example@email.com'
            name='email'
            inputMode='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setInvalidFields([])
              setError('')
            }}
          />
          <div className={styles.form__passwordInput}>
            <input
              className={cx(styles.form__input, {
                [styles.invalid]: invalidFields.includes('password')
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder='Пароль'
              name='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setInvalidFields([])
                setError('')
              }}
            />
            <Button
              color='icon'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <div className={styles.form__showPassword}>
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
          {error && <p className={styles.form__error}>{error}</p>}
          <Button
            type='submit'
            color='accent'
            loading={isLoading}
          >
            Продолжить
          </Button>
          <p className={styles.form__disclaimer}>
            Нажимая &quot;Продолжить&quot;, вы принимаете{' '}
            <Link
              className='link'
              to='/legal/privacy-policy'
            >
              Пользовательское соглашение
            </Link>{' '}
            и{' '}
            <Link
              className='link'
              to='/legal/privacy-policy'
            >
              Политику конфиденциальности
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Form
