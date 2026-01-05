import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'
import Wiki from '@/global-components/Wiki/Wiki'

const Rules = () => {
  return (
    <>
      <Header />
      <main>
        <Wiki
          chapter='rules'
          firstPage='bans'
        />
      </main>
      <Footer />
    </>
  )
}

export default Rules
