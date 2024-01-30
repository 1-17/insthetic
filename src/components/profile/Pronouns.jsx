import { useUser } from "../../hooks"

const Pronouns = () => {
  const { user } = useUser()

  return (
    (user.name && user.pronouns.length > 0) && (
      <span className="text-medium ml-1">
        {user.pronouns.join("/")}
      </span>
    )
  )
}

export default Pronouns
