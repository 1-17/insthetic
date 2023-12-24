import { useUser } from "../../hooks"
import formatBioWithMentions from "../../models/formatBioWithMentions"

const Bio = () => {
  const { user } = useUser()
  const bioWithMentions = formatBioWithMentions()

  return (
    user.bio && (
      <p dangerouslySetInnerHTML={{ __html: bioWithMentions }}></p>
    )
  )
}

export default Bio
