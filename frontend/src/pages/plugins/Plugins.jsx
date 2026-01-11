import Wiki from '@/global-components/Wiki/Wiki'
import NavigationTile from '@/global-components/NavigationTile/NavigationTile'
import { WikiProvider } from '@/context/WikiContext/wikiContext'
import PageLayout from '@/layouts/PageLayout/PageLayout'

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
