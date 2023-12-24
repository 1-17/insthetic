import { useUser } from "../../hooks"
import Avatar from "./Avatar"

const Highlights = () => {
  const { user } = useUser()

  return (
    user.highlights && (
      <ul className="flex gap-3 sm:gap-6 overflow-x-auto">
        {user.highlights.map((h, i) => 
          <li key={i} className="p-2">
            <Avatar highlights={{ image: h.image, description: h.description || "Highlight" }} />
          </li>
        )}
      </ul>
    )
  )
}

export default Highlights
