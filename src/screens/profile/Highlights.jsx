import { useScreen, useUser } from "../../hooks"
import Button from "../../components/layout/Button"
import Avatar from "./Avatar"

const Highlights = () => {
  const { showHighlight } = useScreen()
  const { user, setCurrentHighlight } = useUser()

  return (
    user.highlights && (
      <ul className="*:inline-block whitespace-nowrap overflow-x-auto">
        {
          user.highlights.map((highlight, i) => 
            <li key={i}>
              <Button variant="icon" onClick={() => {
                showHighlight()
                setCurrentHighlight(highlight)
              }}>
                <Avatar highlights={{
                  cover: highlight.cover,
                  description: highlight.description
                }} />
              </Button>
            </li>
          )
        }
      </ul>
    )
  )
}

export default Highlights
