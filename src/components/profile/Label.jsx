import { useUser } from "../../hooks"

const Label = () => {
  const { user } = useUser()
  
  return (
    user.label && (
      <span className="block text-medium">
        {user.label}
      </span>
    )
  )
}

export default Label
