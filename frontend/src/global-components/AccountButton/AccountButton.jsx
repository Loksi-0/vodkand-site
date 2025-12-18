import styles from './AccountButton.module.scss'

import { Context } from "@/main"
import { observer } from "mobx-react-lite"
import { useContext } from "react"

const AccountButton = () => {
    const { store } = useContext(Context)

    return (
        <a 
            className={`${styles.link}  ${store.isLoading && styles.loading}`}
            href={store.isAuth && !store.isLoading ? '/account' : '/auth'}
            draggable='false'
        >
            {!store.isLoading && !store.user.nickname &&
                <div className={styles.svgWrapper}>
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            }
            {!store.isLoading && store.user.nickname &&
                <img 
                className={styles.icon}
                src={`https://mineskin.eu/helm/${store.user.nickname}`}
                alt=''
                loading='lazy'
                draggable='false'
            />
            }
            <span className='visually-hidden'>Аккаунт</span>
        </a>
    )
}

export default observer(AccountButton)