import { useTheme, useUser } from "../hooks"

const formatBioWithMentions = () => {
  const { lightMode } = useTheme()
  const { user } = useUser()

  return (
    user.bio.replace(/(@\w+|#\w+)/g, (text, textPart) => {
      if (textPart.startsWith("@") || textPart.startsWith("#")) {
        return `<span class="${lightMode ? "text-blue-900" : "text-blue-100"}">${text}</span>`
      }

      return text
    })
  )
}

export default formatBioWithMentions
