import Wiki from '@/global-components/Wiki/Wiki'
import NavigationTile from '@/global-components/NavigationTile/NavigationTile'
import { WikiProvider } from '@/context/WikiContext/wikiContext'
import PageLayout from '@/layouts/PageLayout/PageLayout'

const Rules = () => {
  return (
    <PageLayout>
      <WikiProvider
        chapter='rules'
        firstPage='bans'
      >
        <Wiki />
      </WikiProvider>
      <NavigationTile />
    </PageLayout>
  )
}

export default Rules
