import Header from "@/global-components/Header/Header"
import Footer from "@/global-components/Footer/Footer"
import Title from "./components/Title/Title"
import List from "./components/List/List"

function Prices() {
    return (
        <>
            <Header />
            <main>
                <Title 
                    title='Цены'
                />
                <List />
            </main>
            <Footer />
        </>
    )
}

export default Prices