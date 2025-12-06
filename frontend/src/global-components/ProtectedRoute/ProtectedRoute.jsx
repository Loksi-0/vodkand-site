import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Navigate } from 'react-router'

const ProtectedRoute = (props) => {
    const { children, redirect, reversed } = props

    const { store } = useContext(Context)

    if (reversed) {
        if (store.isLoading) {
            return null
        }

        if (store.isAuth && store.user.isActivated && !store.isLoading) {
            return <Navigate to={redirect} replace />
        }
    } else {
        if (store.isLoading) {
            return null
        }

        if (!store.isAuth && !store.isLoading) {
            return <Navigate to={redirect} replace />
        }
    }
    
    return children
}

export default observer(ProtectedRoute)