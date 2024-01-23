import { useUser } from "../../hooks"

const Pronouns = () => {
  const { user } = useUser()

  return (
    (user.name && user.pronouns) && (
      <span className="text-medium ml-1">
        {
          typeof user.pronouns === "string"
            ? user.pronouns
            : user.pronouns.join("/")
        }
      </span>
    )
  )
}

export default Pronouns
