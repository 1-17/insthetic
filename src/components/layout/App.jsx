import classNames from "classnames"
import { useComponent, useTheme } from "../../hooks"
import Header from "./Header"
import Container from "./Container"
import Profile from "../profile"
import Footer from "./Footer"

const App = () => {
  const { lightMode } = useTheme()
  const { profile, config } = useComponent()
  
  return (
    <div className={classNames(
      "flex flex-col max-sm:text-sm min-h-screen transition-colors",
      {
        "bg-light text-dark": lightMode,
        "bg-dark text-light": !lightMode
      }
    )}>
      <Header />
      <Container className="grow pt-3 pb-12">
        {profile && <Profile />}
        {config && "config"}
      </Container>
      <Footer />
    </div>
  )
}

export default App
