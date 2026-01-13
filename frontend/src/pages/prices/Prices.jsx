import Title from './components/Title/Title'
import Products from './components/Products/Products'
import usePageMetadata from '@/hooks/usePageMetadata.js'
import PageLayout from '@/layouts/PageLayout/PageLayout'

const Prices = () => {
  usePageMetadata({
    title: 'Цены'
  })

  return (
    <PageLayout>
      <Title title='Цены' />
      <Products />
    </PageLayout>
  )
}

export default Prices
