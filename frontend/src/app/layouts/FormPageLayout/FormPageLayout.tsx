import { PropsWithChildren } from 'react'
import styles from './FormPageLayout.module.scss'

import cx from 'clsx'

const FormPageLayout = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <main>
      <section className={cx(styles.layout, 'container')}>{children}</section>
    </main>
  )
}

export default FormPageLayout
