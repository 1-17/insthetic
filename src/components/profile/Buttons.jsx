import { BiUserPlus } from "react-icons/bi"
import { useUser } from "../../hooks"
import Stack from "../layout/Stack"
import Button from "../layout/Button"

const Buttons = () => {
  const { user } = useUser()

  return (
    <div className="grid gap-2">
      <Stack>
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
            <Button aria-label="Suggested accounts to follow" disabled full className="xs:w-max">
              <BiUserPlus className="inline text-xl sm:text-2xl transform -scale-x-100" />
            </Button>
          )
        }
      </Stack>
    </div>
  )
}

export default Buttons
