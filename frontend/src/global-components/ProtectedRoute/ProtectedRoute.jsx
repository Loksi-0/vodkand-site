import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import Header from '@/global-components/Header/Header'

const ProtectedRoute = (props) => {
    const { children, redirect, access = 'auth' } = props
    const [isChecking, setIsChecking] = useState(true)

    const { store } = useContext(Context)

    useEffect(() => {
        if (!store.isLoading) {
            setIsChecking(false)
        }
    }, [store.isLoading])

    if (isChecking) {
        return (
            <>
                <Header />
                <main></main>
            </>
        )
    }

    if (access === 'not-auth' && (store.isAuth && store.user?.isActivated && !store.isLoading)) {
        return <Navigate to={redirect} replace />
    }

    if (access === 'has-not-nick' && !store.isLoading && (store.user?.nickname || !store.isAuth)) {
        return <Navigate to={redirect} replace />
    }
    
    if (access === 'auth' && (!store.isAuth && !store.isLoading)) {
        return <Navigate to={redirect} replace />
    }
    
    return children
}

export default observer(ProtectedRoute)