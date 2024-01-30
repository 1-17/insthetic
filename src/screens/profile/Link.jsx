import { RiLink } from "react-icons/ri"
import classNames from "classnames"
import { useTheme, useUser } from "../../hooks"

const Link = () => {
  const { lightMode } = useTheme()
  const { user } = useUser()

  return (
    user.link && (
      <span className={classNames(
        {
          "text-accent-dark": lightMode,
          "text-accent-light": !lightMode
        }
      )}>
        <RiLink className="inline-block align-text-bottom text-lg mr-1" />
        {user.link}
      </span>
    )
  )
}

export default Link
