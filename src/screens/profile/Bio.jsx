import { useUser } from "../../hooks"
import { formatBioWithMentions } from "../../utils"

const Bio = () => {
  const { user } = useUser()
  
  return (
    user.bio && (
      <p dangerouslySetInnerHTML={{ __html: formatBioWithMentions() }} />
    )
  )
}

export default Bio
