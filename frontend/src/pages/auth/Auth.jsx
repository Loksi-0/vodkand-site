import { observer } from 'mobx-react-lite'
import usePageMetadata from '@/hooks/usePageMetadata.js'
import Form from '@/pages/auth/Form/Form'
import Mail from '@/pages/auth/Mail/Mail'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext/authContext'
import FormPageLayout from '@/layouts/FormPageLayout/FormPageLayout'

const Auth = observer(() => {
  const { page, isActivated } = useContext(AuthContext)

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
