import NavigationTile from '@/shared/ui/NavigationTile'
import PageLayout from '@/app/layouts/PageLayout'
import { WikiProvider } from '@/widgets/wiki/model/wikiContext'
import Wiki from '@/widgets/wiki'

const Plugins = () => {
  return (
    <PageLayout>
      <WikiProvider
        chapter='plugins'
        firstPage='brewery'
      >
        <Wiki />
      </WikiProvider>
      <NavigationTile />
    </PageLayout>
  )
}

export default Plugins
