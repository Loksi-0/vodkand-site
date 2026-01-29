import NavigationTile from '@/shared/ui/NavigationTile'
import PageLayout from '@/app/layouts/PageLayout'
import { WikiProvider } from '@/widgets/wiki/model/wikiContext'
import Wiki from '@/widgets/wiki'

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
