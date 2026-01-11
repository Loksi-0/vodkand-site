import Title from './components/Title/Title'
import List from './components/List/List'
import usePageMetadata from '@/hooks/usePageMetadata.js'
import PageLayout from '@/layouts/PageLayout/PageLayout'

const Prices = () => {
  usePageMetadata({
    title: 'Цены'
  })

  return (
    <PageLayout>
      <Title title='Цены' />
      <List />
    </PageLayout>
  )
}

export default Prices
