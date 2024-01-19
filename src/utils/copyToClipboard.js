import { capitalizeString } from "."

const _copyToClipboard = (label, text) => {
  if (text && label) {
    return navigator.clipboard.writeText(text)
      .then(() => alert(`${capitalizeString(label)} copied to clipboard!`))
      .catch(() => alert(`Failed to copy ${label} to clipboard. Please, try again.`))
  }

  if (!label) {
    throw new Error("Copy to clipboard: A label must be provided to identify the copied content.")
  }
  
  return alert("There's no text to copy.")
}

export default _copyToClipboard
