import { useUser } from "../../hooks"
import Button from "../../components/layout/Button"
import Avatar from "./Avatar"

const Highlights = () => {
  const { user, highlight: { select } } = useUser()

  return (
    user.highlights && (
      <ul className="*:inline-block whitespace-nowrap overflow-x-auto">
        {
          user.highlights.map(highlight => 
            <li key={highlight.id}>
              <Button variant="icon" onClick={() => select(highlight)} className="m-1">
                <Avatar highlights={highlight} />
              </Button>
            </li>
          )
        }
      </ul>
    )
  )
}

export default Highlights
