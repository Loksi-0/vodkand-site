import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Navigate } from 'react-router'
import Header from '@/global-components/Header/Header'

const ProtectedRoute = observer((props) => {
  const { children, redirect, access = 'auth' } = props

  const { store } = useContext(Context)

  if (store.isLoading) {
    return (
      <>
        <Header />
        <main></main>
      </>
    )
  }

  if (
    access === 'not-auth' &&
    store.isAuth &&
    localStorage.getItem('isActivated') === 'pending'
  ) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    )
  }

  if (access === 'has-not-nick' && (store.user?.nickname || !store.isAuth)) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    )
  }

  if (access === 'auth' && !store.isAuth) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    )
  }

  if (access === 'activated' && !store.user?.isActivated) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    )
  }

  return children
})

export default ProtectedRoute
