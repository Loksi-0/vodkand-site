import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Tabs from "@/global-components/Tabs/Tabs"

function Plugins() {
  return (
    <>
      <Header />
      <main>
        <Tabs 
          page='plugins'
        />
      </main>
      <Footer />
    </>
  )
}

export default Plugins
