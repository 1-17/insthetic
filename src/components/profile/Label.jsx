import { useUser } from "../../hooks"

const Label = () => {
  const { user } = useUser()
  
  return (
    user.label && (
      <span className="text-medium">
        {user.label}
      </span>
    )
  )
}

export default Label
