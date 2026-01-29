import Header from '@/widgets/header/Header'
import Footer from '@/widgets/footer/Footer'
import { PropsWithChildren } from 'react'

type PageLayoutProps = PropsWithChildren<{
  stickyHeader?: boolean
  className?: string
}>

const PageLayout = (props: PageLayoutProps) => {
  const { children, stickyHeader = true, className = '' } = props

  return (
    <>
      <Header sticky={stickyHeader} />
      <main className={className}>{children}</main>
      <Footer />
    </>
  )
}

export default PageLayout
