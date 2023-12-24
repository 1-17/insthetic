import { useUser } from "../../hooks"

const Pronouns = () => {
  const { user } = useUser()

  return (
    user.pronouns && (
      <span className="text-medium ml-1">
        {user.pronouns}
      </span>
    )
  )
}

export default Pronouns
