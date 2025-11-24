import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Accordion from "@/global-components/Accordion/Accordion"

function Index() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Accordion />
      <Footer />
    </>
  )
}

export default Index
