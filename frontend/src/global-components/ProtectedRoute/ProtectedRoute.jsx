import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Navigate } from 'react-router'
import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'

const ProtectedRoute = (props) => {
    const { children, redirect, access = 'auth' } = props

    const { store } = useContext(Context)

    if (store.isLoading) {
        return (
            <>
                <Header />
                <main></main>
                <Footer />
            </>
        )
    }

    if (access === 'not-auth' && (store.isAuth && store.user.isActivated && !store.isLoading)) {
        return <Navigate to={redirect} replace />
    }

    if (access === 'has-not-nick' && (store.user.nickname || !store.isAuth)) {
        return <Navigate to={redirect} replace />
    }
    
    if (access === 'auth' && (!store.isAuth && !store.isLoading)) {
        return <Navigate to={redirect} replace />
    }
    
    return children
}

export default observer(ProtectedRoute)