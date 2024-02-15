import Header from "./Header"
import Container from "./Container"
import Screens from "../../screens"
import Footer from "./Footer"

const App = () => {
  return (
    <>
      <Header />
      <Container element="main" className="grow pt-3 pb-14">
        <Screens />
      </Container>
      <Footer />
    </>
  )
}

export default App
