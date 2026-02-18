'use client'

import { observer } from 'mobx-react-lite'
import { AuthContext, Form, Mail } from '@/features/auth-page'
import FormPageLayout from '@/app/layouts/FormPageLayout'
import useCustomContext from '@/shared/hooks/useCustomContext'

const AuthPage = observer(() => {
  const { page, isActivated } = useCustomContext(AuthContext)

  return (
    <FormPageLayout>
      {page === 1 && <Form />}
      {page === 2 && !isActivated && <Mail />}
    </FormPageLayout>
  )
})

export default AuthPage
