import { MdVerified } from "react-icons/md"
import { useUser } from "../../hooks"

const VerifiedBadge = () => {
  const { user } = useUser()

  return (
    user.verified && (
      <MdVerified className="inline align-baseline text-accent text-xs sm:text-sm ml-1" />
    )
  )
}

export default VerifiedBadge
