import { BiUserPlus } from "react-icons/bi"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { useUser } from "../../hooks"
import Button from "../layout/Button"

const Buttons = () => {
  const { user } = useUser()

  return (
    <div className="grid gap-2">
      {user.shop && (
        <Button>
          <HiOutlineShoppingBag className="inline mr-1" />
          <span className="align-middle">
            See shop
          </span>
        </Button>
      )}
      <div className="flex max-xs:flex-wrap gap-2">
        <Button main>
          Follow
        </Button>
        <Button>
          Message
        </Button>
        {user.contact && (
          <Button>
            {user.contact}
          </Button>
        )}
        {user.suggestions && (
          <Button aria-label="Suggestions" className="xs:w-max">
            <BiUserPlus className="inline text-xl sm:text-2xl transform -scale-x-100" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Buttons
