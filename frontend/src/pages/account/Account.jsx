import styles from './Account.module.scss'

import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'
import Nick from './components/Nick/Nick'
import Warns from './components/Warns/Warns'
import Buttons from './components/Buttons/Buttons'
import { useContext } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import Alert from './components/Alert/Alert'

const Account = () => {
    const { store } = useContext(Context)

    const handleLogout = async () => {
        const result = await store.logout()

        if (!result.statusText === 'OK') {
            console.log(result)
        }
    }

    return (
        <>
            <Header />
            <main className={`${styles.account} container`}>
                {!store.user.isActivated && 
                    <Alert type='not-activated' />
                }
                {store.user.isActivated && !store.user.hasPass && 
                    <Alert type='has-not-pass' />
                }
                {store.user.isActivated && store.user.hasPass && 
                <>
                    <Nick />
                    <Warns />
                    <Buttons 
                        onLogout={handleLogout}
                    />
                </>
                }
            </main>
            <Footer />
        </>
    )
}

export default observer(Account)