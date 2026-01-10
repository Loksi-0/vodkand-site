import styles from './GoogleButton.module.scss'

import { useNavigate } from 'react-router'

import googleLogo from '@/assets/icons/google-logo.png'

const GoogleButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${import.meta.env.VITE_API_URL}/google/url`)
  }

  return (
    <button
      type='button'
      className={styles.googleButton}
      onClick={handleClick}
    >
      <img
        className={styles.googleButton__icon}
        src={googleLogo}
        alt=''
        loading='lazy'
        draggable='false'
      />
      Войти через Google
    </button>
  )
}

export default GoogleButton
