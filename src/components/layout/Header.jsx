import { PiArrowLeftBold } from "react-icons/pi"
import { useScreen, useUser } from "../../hooks"
import AppBar from "./AppBar"
import Username from "../../screens/profile/Username"
import VerifiedBadge from "../../screens/profile/VerifiedBadge"
import Button from "./Button"

const Header = () => {
  const { profile, showProfile, screenTitle } = useScreen()
  const { user } = useUser()

  return (
    <AppBar element="header">
      {
        profile ? (
          <>
            <Username />
            {
              user.verified && (
                <VerifiedBadge />
              )
            }
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
              <PiArrowLeftBold aria-label="Back" className="inline align-sub" />
            </Button>
            <h1 className="inline">
              {screenTitle}
            </h1>
          </>
        )
      }
    </AppBar>
  )
}

export default Header
