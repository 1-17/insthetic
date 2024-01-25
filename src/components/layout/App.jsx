import { useTheme, useComponent } from "../../hooks"
import Header from "./Header"
import Container from "./Container"
import Profile from "../profile"
import Config from "../config"
import Footer from "./Footer"
import classNames from "classnames"

const App = () => {
  const { lightMode } = useTheme()
  const { profile, config } = useComponent()

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
        {profile && <Profile />}
        {config && <Config />}
      </Container>
      <Footer />
    </>
  )
}

export default App
