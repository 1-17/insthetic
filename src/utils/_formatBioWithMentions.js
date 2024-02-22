import { useUser } from "../hooks"

const _formatBioWithMentions = () => {
  const { user } = useUser()

  const escapeInputHTML = document.createElement("div")
  escapeInputHTML.innerText = user.bio
  const sanitizedBio = escapeInputHTML.innerHTML

  return (
    sanitizedBio.replace(/(@\w+|#\w+)/g, (text, textPart) => {
      if (textPart.startsWith("@") || textPart.startsWith("#")) {
        return (
          `<span class="text-accent-dark dark:text-accent-light">${text}</span>`
        )
      }

      return text
    })
  )
}

export default _formatBioWithMentions
