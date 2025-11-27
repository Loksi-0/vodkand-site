import styles from './Account.module.scss'

import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'
import Nick from './components/Nick/Nick'
import Warns from './components/Warns/Warns'
import Buttons from './components/Buttons/Buttons'

const Account = () => {
    return (
        <>
            <Header />
            <main className={`${styles.account} container`}>
                <Nick />
                <Warns />
                <Buttons />
            </main>
            <Footer />
        </>
    )
}

export default Account