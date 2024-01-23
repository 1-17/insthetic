import { TbBrandThreads } from "react-icons/tb"
import { useTheme, useUser } from "../../hooks"
import classNames from "classnames"

const Threads = () => {
  const { lightMode } = useTheme()
  const { user } = useUser()

  return (
    user.threads && (
      <span className={classNames(
        "rounded-full block px-2 py-0.5 w-fit",
        {
          "bg-medium-light": lightMode,
          "bg-medium-dark": !lightMode
        }
      )}>
        <TbBrandThreads className="inline align-text-bottom text-lg" />
        {user.threads}
      </span>
    )
  )
}

export default Threads
