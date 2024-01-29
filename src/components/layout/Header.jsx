import { PiArrowLeftBold } from "react-icons/pi"
import { useComponent } from "../../hooks"
import AppBar from "./AppBar"
import Button from "./Button"
import Username from "../profile/Username"
import VerifiedBadge from "../profile/VerifiedBadge"

const Header = () => {
  const { profile, config, changeComponent } = useComponent()

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
              aria-label={config && "Back to profile"}
              onClick={changeComponent}
              variant="icon"
              className="-ml-3 mr-3 p-3"
            >
              <PiArrowLeftBold className="inline align-sub" />
            </Button>
            <h1 className="inline">
              {config && "Config"}
            </h1>
          </>
        )
      }
    </AppBar>
  )
}

export default Header
