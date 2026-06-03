import { Hero, History, About, BuyPassBanner } from '@/features/index-page'

import PageLayout from '@/app/layouts/PageLayout'

import NavigationTile from '@/shared/ui/NavigationTile'
import IndexAccordion from '@/features/index-page/ui/IndexAccordion/IndexAccordion'

const Index = () => {
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
