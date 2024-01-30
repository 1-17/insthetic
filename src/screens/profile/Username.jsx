import { useUser } from "../../hooks"

const Username = () => {
  const { user } = useUser()
  
  return (
    <h1 {...user.verified && { className: "inline" }}>
      {user.username}
    </h1>
  )
}

export default Username
