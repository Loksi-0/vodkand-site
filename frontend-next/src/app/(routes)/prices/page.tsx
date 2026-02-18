import PageLayout from '@/app/layouts/PageLayout'
import { Title, Products } from '@/features/prices-page'

const Prices = () => {
  // usePageMetadata({
  //   title: 'Цены'
  // })

  return (
    <PageLayout>
      <Title title='Цены' />
      <Products />
    </PageLayout>
  )
}

export default Prices
