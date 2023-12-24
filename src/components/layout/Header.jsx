import { MdVerified } from "react-icons/md"
import { PiArrowLeftBold } from "react-icons/pi"
import classNames from "classnames"
import { useComponent, useUser } from "../../hooks"
import AppBar from "./AppBar"

const Header = () => {
  const { user } = useUser()
  const { profile, config, changeComponent } = useComponent()

  return (
    <AppBar element={"header"}>
      <h1 className={classNames(
        "text-xl sm:text-2xl font-semibold",
        {
          "py-3": profile
        }
        )}>
        {profile &&
          <>
            {user.username}
            {
              user.verified &&
              <MdVerified className="inline align-baseline text-accent text-xs sm:text-sm ml-1" />
            }
          </>
        }
        {config &&
          <>
            <button
              aria-label="Back to profile"
              onClick={changeComponent}
              className="-ml-3 mr-3 p-3">
              <PiArrowLeftBold className="inline align-sub" />
            </button>
            Config
          </>
        }
      </h1>
    </AppBar>
  )
}

export default Header
