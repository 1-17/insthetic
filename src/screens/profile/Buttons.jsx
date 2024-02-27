import { useUser } from "../../hooks"
import Stack from "../../components/layout/Stack"
import Button from "../../components/layout/Button"
import SuggestionsButton from "./SuggestionsButton"

const Buttons = () => {
  const { user } = useUser()

  return (
    <Stack className="max-xs:flex-wrap gap-2">
      <Button variant="primary" disabled full>
        Follow
      </Button>
      <Button disabled full>
        Message
      </Button>
      {
        user.contact && (
          <Button disabled full>
            {user.contact}
          </Button>
        )
      }
      {
        user.suggestions && (
          <SuggestionsButton />
        )
      }
    </Stack>
  )
}

export default Buttons
