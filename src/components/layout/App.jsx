import Header from "./Header"
import Container from "./Container"
import Screens from "../../screens"
import Footer from "./Footer"
import Popup from "./Popup"

const App = () => {
  return (
    <>
      <Header />
      <Container element="main" className="grow pt-3 pb-14">
        <Screens />
      </Container>
      <Footer />
      <Popup />
    </>
  )
}

export default App
