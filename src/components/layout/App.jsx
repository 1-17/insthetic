import classNames from "classnames"
import { useTheme } from "../../hooks"
import Header from "./Header"
import Container from "./Container"
import Screens from "../../screens"
import Footer from "./Footer"

const App = () => {
  const { lightMode } = useTheme()

  document.getElementById("root").setAttribute("class", classNames(
    "flex flex-col max-sm:text-sm min-h-screen transition-colors",
    {
      "bg-light text-dark": lightMode,
      "bg-dark text-light": !lightMode
    }
  ))
  
  return (
    <>
      <Header />
      <Container element="main" className="grow pt-3 pb-12">
        <Screens />
      </Container>
      <Footer />
    </>
  )
}

export default App
