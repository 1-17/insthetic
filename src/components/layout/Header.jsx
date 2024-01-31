import { PiArrowLeftBold } from "react-icons/pi"
import { useComponent } from "../../hooks"
import AppBar from "./AppBar"
import Button from "./Button"
import Username from "../../screens/profile/Username"
import VerifiedBadge from "../../screens/profile/VerifiedBadge"

const Header = () => {
  const { profile, profileConfig, addMedia, showProfile } = useComponent()

  return (
    <AppBar element="header">
      {
        profile ? (
          <>
            <Username />
            <VerifiedBadge />
          </>
        )
        : (
          <>
            <Button
              aria-label="Go back to profile"
              onClick={showProfile}
              variant="icon"
              className="-ml-3 mr-3 p-3"
            >
              <PiArrowLeftBold className="inline align-sub" />
            </Button>
            <h1 className="inline">
              {profileConfig && "Profile config"}
              {addMedia && "Add media"}
            </h1>
          </>
        )
      }
    </AppBar>
  )
}

export default Header
