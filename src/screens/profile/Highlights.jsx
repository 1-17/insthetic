import { useUser } from "../../hooks"
import Avatar from "./Avatar"

const Highlights = () => {
  const { user } = useUser()

  return (
    user.highlights && (
      <ul className="flex gap-3 sm:gap-6 overflow-x-auto">
        {
          user.highlights.map((highlight, i) => 
            <li key={i} className="p-2">
              <Avatar highlights={{
                image: highlight.image,
                description: highlight.description || "Highlight"
              }} />
            </li>
          )
        }
      </ul>
    )
  )
}

export default Highlights
