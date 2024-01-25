import { MdVerified } from "react-icons/md"
import { PiArrowLeftBold } from "react-icons/pi"
import { useUser, useComponent } from "../../hooks"
import AppBar from "./AppBar"
import Button from "./Button"

const Header = () => {
  const { user } = useUser()
  const { profile, config, changeComponent } = useComponent()

  return (
    <AppBar element="header">
      {
        profile ? (
          <>
            <h1 {...user.verified && { className: "inline" }}>
              {user.username}
            </h1>
            {
              user.verified && (
                <MdVerified className="inline align-baseline text-accent text-xs sm:text-sm ml-1" />
              )
            }
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
