import classNames from "classnames"
import { useTheme, useUser } from "../hooks"

const formatBioWithMentions = () => {
  const { lightMode } = useTheme()
  const { user } = useUser()

  return (
    user.bio.replace(/(@\w+|#\w+)/g, (text, textPart) => {
      if (textPart.startsWith("@") || textPart.startsWith("#")) {
        return `
          <span class="${classNames(
            {
              "text-blue-900": lightMode,
              "text-blue-100": !lightMode
            })}">${text}</span>`
      }

      return text
    })
  )
}

export default formatBioWithMentions
