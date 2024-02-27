import { BiUserPlus } from "react-icons/bi"
import Button from "../../components/layout/Button"

const SuggestionsButton = () => {
  return (
    <Button aria-label="Suggested accounts to follow" disabled full className="xs:w-max">
      <BiUserPlus aria-label="Suggestions" className="inline text-xl sm:text-2xl transform -scale-x-100" />
    </Button>
  )
}

export default SuggestionsButton
