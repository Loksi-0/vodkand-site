import { Hero, History, About, BuyPassBanner } from '@/features/index-page'

import PageLayout from '@/app/layouts/PageLayout'
import { accordionList } from '../model/accordion.data'

import Accordion from '@/shared/ui/Accordion'
import NavigationTile from '@/shared/ui/NavigationTile'
import usePageMetadata from '@/shared/hooks/usePageMetadata'
import frog from '@/shared/assets/images/frog.png'

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
      <Accordion list={accordionList} />
      <BuyPassBanner />
      <NavigationTile />
    </PageLayout>
  )
}

export default Index
