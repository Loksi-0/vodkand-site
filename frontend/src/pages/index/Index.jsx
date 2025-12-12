import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Accordion from "@/global-components/Accordion/Accordion"
import NavigationTile from "@/global-components/NavigationTile/NavigationTile"

function Index() {
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
