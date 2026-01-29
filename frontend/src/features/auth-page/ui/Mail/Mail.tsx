import styles from './Mail.module.scss'

import cx from 'clsx'

import mail from '@/shared/assets/icons/mail.svg'

import Button from '@/shared/ui/Button'
import { MainContext } from '@/app/context/MainContext'
import { AuthContext } from '@/features/auth-page'
import useCustomContext from '@/shared/hooks/useCustomContext'

const Mail = () => {
  const { userStore } = useCustomContext(MainContext)
  const { email } = useCustomContext(AuthContext)

  return (
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
        <h1 className={cx(styles.mail__title, 'h2')}>Проверьте почту</h1>
        <p className={styles.mail__description}>
          Мы отправили письмо для подтверждения на почту{' '}
          <span className='accent'>{email}</span>
        </p>
        <div className={styles.mail__button}>
          <Button
            onClick={() => {
              void userStore.sendMail(email)
            }}
            color='transparentDark'
          >
            Отправить еще раз
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Mail
