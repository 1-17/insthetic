import { RiLink } from "react-icons/ri"
import { useUser } from "../../hooks"

const Link = () => {
  const { user } = useUser()

  return (
    user.link && (
      <span className="text-accent-dark dark:text-accent-light">
        <RiLink aria-label="Link" className="inline-block align-text-bottom text-lg mr-1" />
        {user.link}
      </span>
    )
  )
}

export default Link
