import classNames from "classnames"
import { useTheme, useUser } from "../hooks"

const _formatBioWithMentions = () => {
  const { lightMode } = useTheme()
  const { user } = useUser()

  const escapeInputHTML = document.createElement("div")
  escapeInputHTML.innerText = user.bio
  const sanitizedBio = escapeInputHTML.innerHTML

  return (
    sanitizedBio.replace(/(@\w+|#\w+)/g, (text, textPart) => {
      if (textPart.startsWith("@") || textPart.startsWith("#")) {
        return (`
          <span class="${classNames(
            {
              "text-accent-dark": lightMode,
              "text-accent-light": !lightMode
            }
          )}">${text}</span>`
        )
      }

      return text
    })
  )
}

export default _formatBioWithMentions
