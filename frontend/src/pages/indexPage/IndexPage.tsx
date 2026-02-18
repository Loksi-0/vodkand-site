import { Hero, History, About, BuyPassBanner } from '@/features/index-page'

import PageLayout from '@/app/layouts/PageLayout'

import NavigationTile from '@/shared/ui/NavigationTile'
import usePageMetadata from '@/shared/hooks/usePageMetadata'
import frog from '@/shared/assets/images/frog.png'
import IndexAccordion from '@/features/index-page/ui/IndexAccordion/IndexAccordion'

const Index = () => {
  usePageMetadata({
    title: 'Vodkand',
    description:
      'Ванильный майнкрафт сервер с неограниченными возможностями для творчества',
    keywords:
      'Vodkand, Водканд, майнкрафт сервер, Forever world, ванильный сервер',
    ogTitle: 'Vodkand',
    ogDescription:
      'Forever world с неограниченными возможностями для творчества',
    ogImage: frog
  })

  return (
    <PageLayout stickyHeader={false}>
      <Hero />
      <About />
      <History />
      <IndexAccordion />
      <BuyPassBanner />
      <NavigationTile />
    </PageLayout>
  )
}

export default Index
