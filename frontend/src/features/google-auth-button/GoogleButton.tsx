import styles from './GoogleButton.module.scss'

import googleLogo from '@/shared/assets/icons/google-logo.png'

const GoogleButton = () => {
  const handleClick = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/google/url`
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
