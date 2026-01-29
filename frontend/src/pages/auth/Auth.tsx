import { observer } from 'mobx-react-lite'
import usePageMetadata from '@/shared/hooks/usePageMetadata'
import { AuthContext, Form, Mail } from '@/features/auth-page'
import FormPageLayout from '@/app/layouts/FormPageLayout'
import useCustomContext from '@/shared/hooks/useCustomContext'

const Auth = observer(() => {
  const { page, isActivated } = useCustomContext(AuthContext)

  usePageMetadata({
    title: 'Авторизация',
    index: false,
    follow: false
  })

  return (
    <FormPageLayout>
      {page === 1 && <Form />}
      {page === 2 && !isActivated && <Mail />}
    </FormPageLayout>
  )
})

export default Auth
