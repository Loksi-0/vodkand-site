import NavigationTile from '@/shared/ui/NavigationTile'
import PageLayout from '@/app/layouts/PageLayout'
import { WikiProvider } from '@/widgets/wiki/model/wikiContext'
import Wiki from '@/widgets/wiki'

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
