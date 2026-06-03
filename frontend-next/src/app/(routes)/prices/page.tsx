import PageLayout from '@/app/layouts/PageLayout'
import { Title, Products } from '@/features/prices-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Цены',
  description: 'Стоимость продуктов на Vodkand',
  keywords:
    'Vodkand, Водканд, майнкрафт сервер, Forever world, ванильный сервер',
  openGraph: {
    title: 'Цены',
    description: 'Стоимость продуктов на Vodkand'
  }
}

const Prices = () => {
  return (
    <PageLayout>
      <Title title='Цены' />
      <Products />
    </PageLayout>
  )
}

export default Prices
