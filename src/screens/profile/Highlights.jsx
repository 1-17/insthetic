import { useUser } from "../../hooks"
import Avatar from "./Avatar"

const Highlights = () => {
  const { user } = useUser()

  return (
    user.highlights && (
      <ul className="*:inline-block whitespace-nowrap overflow-x-auto">
        {
          user.highlights.map((highlight, i) => 
            <li key={i}>
              <Avatar highlights={{
                cover: highlight.cover,
                description: highlight.description
              }} />
            </li>
          )
        }
      </ul>
    )
  )
}

export default Highlights
