import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Article from "./components/Article/Article"
import Tabs from "@/global-components/Tabs/Tabs"

function Plugins() {
  return (
    <>
      <Header />
      <main>
        <Tabs />
        {/* <Article 
          pluginsList={[
            {
              title: 'BreweryX',
              icon: '@/assets/icons/plugins/brevery.png',
              isCurrent: true
            }
          ]}
        /> */}
      </main>
      <Footer />
    </>
  )
}

export default Plugins
