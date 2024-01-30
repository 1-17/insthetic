import { useUser } from "../../hooks"

const Name = () => {
  const { user } = useUser()

  return (
    user.name && (
      <h2 {...user.pronouns.length > 0 && { className: "inline" }}>
        {user.name}
      </h2>
    )
  )
}

export default Name
