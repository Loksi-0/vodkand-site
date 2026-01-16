import Header from '@/widgets/header/ui/Header'
import Footer from '@/widgets/footer/ui/Footer'

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
