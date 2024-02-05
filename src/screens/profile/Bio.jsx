import { useUser } from "../../hooks"
import { formatBioWithMentions } from "../../utils"

const Bio = () => {
  const { user } = useUser()
  
  return (
    user.bio && (
      <p
        dangerouslySetInnerHTML={{ __html: formatBioWithMentions() }}
        className="leading-tight break-words"
      />
    )
  )
}

export default Bio
