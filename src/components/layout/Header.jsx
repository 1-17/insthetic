import { PiArrowLeftBold } from "react-icons/pi"
import { useScreen } from "../../hooks"
import AppBar from "./AppBar"
import Username from "../../screens/profile/Username"
import VerifiedBadge from "../../screens/profile/VerifiedBadge"
import Button from "./Button"

const Header = () => {
  const { profile, profileConfig, addMedia, highlight, showProfile } = useScreen()

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
              {highlight && "Highlight"}
            </h1>
          </>
        )
      }
    </AppBar>
  )
}

export default Header
