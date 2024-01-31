import classNames from "classnames"
import { useTheme } from "../../hooks"
import Header from "./Header"
import Container from "./Container"
import Screens from "../../screens"
import Footer from "./Footer"

const App = () => {
  const { lightMode } = useTheme()

  document.body.setAttribute("class", classNames(
    {
      "bg-light text-dark": lightMode,
      "bg-dark text-light": !lightMode
    }
  ))

  document.getElementById("root").setAttribute("class", classNames(
    "bg-inherit flex flex-col max-sm:text-sm min-h-screen transition-colors",
  ))
  
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
