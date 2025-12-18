import styles from './GoogleButton.module.scss'

import googleLogo from '@/assets/icons/google-logo.png'

const GoogleButton = () => {
    const handleClick = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/google/url`
    }

    return (
        <button 
            type='button'
            className={styles.button}
            onClick={handleClick}
        >
            <img 
                className={styles.icon}
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