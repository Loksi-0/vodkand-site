import Wiki from '@/global-components/Wiki/Wiki'
import NavigationTile from '@/global-components/NavigationTile/NavigationTile'
import { WikiProvider } from '@/context/WikiContext/wikiContext'
import PageLayout from '@/layouts/PageLayout/PageLayout'

const Legal = () => {
  return (
    <PageLayout>
      <WikiProvider
        chapter='legal'
        firstPage='privacy-policy'
      >
        <Wiki />
      </WikiProvider>
      <NavigationTile />
    </PageLayout>
  )
}

export default Legal
