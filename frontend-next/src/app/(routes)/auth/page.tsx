import AuthPage from '@/app/(routes)/auth/AuthPage'
import { AuthProvider } from '@/features/auth-page'

const Auth = () => {
  // usePageMetadata({
  //   title: 'Авторизация',
  //   index: false,
  //   follow: false
  // })

  return (
    <AuthProvider>
      <AuthPage />
    </AuthProvider>
  )
}

export default Auth
