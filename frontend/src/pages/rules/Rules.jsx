import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Wiki from "@/global-components/Wiki/Wiki"

function Rules() {
  return (
    <>
      <Header />
      <main>
        <Wiki
          page='rules'
        />
      </main>
      <Footer />
    </>
  )
}

export default Rules
