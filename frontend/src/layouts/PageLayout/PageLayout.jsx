import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'

const PageLayout = (props) => {
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
