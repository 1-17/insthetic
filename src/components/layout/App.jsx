import Contexts from "../../contexts"
import Header from "./Header"
import Container from "./Container"
import Screens from "../../screens"
import Footer from "./Footer"
import Popup from "../popup"

const App = () => {
  return (
    <Contexts>
      <Header />
      <Container element="main" className="grow pt-3 pb-14">
        <Screens />
      </Container>
      <Footer />
      <Popup />
    </Contexts>
  )
}

export default App
