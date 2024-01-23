import { MdVerified } from "react-icons/md"
import { PiArrowLeftBold } from "react-icons/pi"
import { useComponent, useUser } from "../../hooks"
import AppBar from "./AppBar"

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
            <button
              aria-label="Back to profile"
              onClick={changeComponent}
              className="-ml-3 mr-3 p-3"
            >
              <PiArrowLeftBold className="inline align-sub" />
            </button>
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
