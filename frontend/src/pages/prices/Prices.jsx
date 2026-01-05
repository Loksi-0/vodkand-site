import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'
import Title from './components/Title/Title'
import List from './components/List/List'
import usePageMetadata from '@/usePageMetadata'

const Prices = () => {
  usePageMetadata({
    title: 'Цены'
  })

  return (
    <>
      <Header />
      <main>
        <Title title='Цены' />
        <List />
      </main>
      <Footer />
    </>
  )
}

export default Prices
