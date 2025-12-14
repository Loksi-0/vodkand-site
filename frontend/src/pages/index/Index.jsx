import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Accordion from "@/global-components/Accordion/Accordion"
import NavigationTile from "@/global-components/NavigationTile/NavigationTile"
import usePageMetadata from "@/usePageMetadata"
import frog from '@/assets/images/frog.png'

function Index() {
  usePageMetadata({
    title: 'Vodkand',
    description: 'Ванильный майнкрафт сервер с неограниченными возможностями для творчества',
    keywords: 'Vodkand, Водканд, майнкрафт сервер, Forever world, ванильный сервер',
    ogTitle: 'Vodkand',
    ogDescription: 'Forever world с неограниченными возможностями для творчества',
    ogImage: frog
  })

  return (
    <>
      <Header sticky={false} />
      <main>
        <Hero />
        <About />
        <Accordion />
        <NavigationTile />
      </main>
      <Footer />
    </>
  )
}

export default Index
