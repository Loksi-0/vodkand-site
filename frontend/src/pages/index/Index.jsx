import Hero from './components/Hero/Hero'
import History from './components/History/History'
import About from './components/About/About'
import Accordion from '@/global-components/Accordion/Accordion'
import NavigationTile from '@/global-components/NavigationTile/NavigationTile'
import usePageMetadata from '@/hooks/usePageMetadata.js'
import frog from '@/assets/images/frog.png'
import BuyPassBanner from './components/BuyPassBanner/BuyPassBanner'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import { accordionList } from '@/pages/index/accordion.data'

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
