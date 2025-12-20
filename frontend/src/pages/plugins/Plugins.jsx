
import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Wiki from "@/global-components/Wiki/Wiki"
import NavigationTile from "@/global-components/NavigationTile/NavigationTile"

function Plugins() {
  return (
    <>
      <Header />
      <main>
        <Wiki
          chapter='plugins'
          firstPage='brewery'
        />
        <NavigationTile />
      </main>
      <Footer />
    </>
  )
}

export default Plugins
