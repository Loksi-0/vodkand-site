import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Wiki from "@/global-components/Wiki/Wiki"

function Terms() {
  return (
    <>
      <Header />
      <main>
        <Wiki
          page='terms'
        />
      </main>
      <Footer />
    </>
  )
}

export default Terms