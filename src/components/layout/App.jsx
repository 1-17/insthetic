import { useTheme, useComponent } from "../../hooks"
import Header from "./Header"
import Container from "./Container"
import Profile from "../../screens/profile"
import ProfileConfig from "../../screens/profileConfig"
import Footer from "./Footer"
import classNames from "classnames"

const App = () => {
  const { lightMode } = useTheme()
  const { profile, profileConfig } = useComponent()

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
        {profileConfig && <ProfileConfig />}
      </Container>
      <Footer />
    </>
  )
}

export default App
