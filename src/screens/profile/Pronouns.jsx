import { useUser } from "../../hooks"

const Pronouns = () => {
  const { user } = useUser()

  return (
    (user.name && user.pronouns.length > 0) && (
      <span className="text-medium ml-1">
        {
          user.pronouns.length > 1
            ? user.pronouns.join("/")
            : user.pronouns
        }
      </span>
    )
  )
}

export default Pronouns
