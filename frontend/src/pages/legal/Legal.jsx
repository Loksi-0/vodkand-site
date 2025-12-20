import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Wiki from "@/global-components/Wiki/Wiki"
import NavigationTile from "@/global-components/NavigationTile/NavigationTile"

function Legal() {
  return (
    <>
      <Header />
      <main>
        <Wiki
          chapter='legal'
          firstPage='privacy-policy'
        />
        <NavigationTile />
      </main>
      <Footer />
    </>
  )
}

export default Legal