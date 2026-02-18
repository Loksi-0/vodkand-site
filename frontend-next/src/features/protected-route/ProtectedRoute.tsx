import { MainContext } from '@/app/context/MainContext'
import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import Header from '@/widgets/header'
import useCustomContext from '@/shared/hooks/useCustomContext'

type ProtectedRouteProps = PropsWithChildren<{
  redirect: string
  access?: 'auth' | 'not-auth' | 'has-not-nick' | 'activated'
}>

const ProtectedRoute = observer((props: ProtectedRouteProps) => {
  const { children, redirect, access = 'auth' } = props

  const { userStore } = useCustomContext(MainContext)

  if (userStore.isLoading) {
    return (
      <>
        <Header />
        <main></main>
      </>
    )
  }

  if (
    access === 'not-auth' &&
    userStore.isAuth &&
    localStorage.getItem('isActivated') === 'pending'
  ) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    )
  }

  if (
    access === 'has-not-nick' &&
    (userStore.user?.nickname || !userStore.isAuth)
  ) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    )
  }

  if (access === 'auth' && !userStore.isAuth) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    )
  }

  if (access === 'activated' && !userStore.user?.isActivated) {
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
