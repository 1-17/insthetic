import { useUser } from "../../hooks"

const Category = () => {
  const { user } = useUser()
  
  return (
    user.category && (
      <span className="block text-medium">
        {user.category}
      </span>
    )
  )
}

export default Category
