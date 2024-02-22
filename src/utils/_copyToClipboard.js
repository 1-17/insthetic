import { formatString } from "."

const _copyToClipboard = (elementId, openBasicPopup) => {
  if (!elementId) {
    throw new Error("Copy to Clipboard: Missing element id argument.")
  }

  if (!openBasicPopup) {
    throw new Error("Copy to Clipboard: Missing popup opener function argument.")
  }

  return navigator.clipboard
    .writeText(document.getElementById(elementId).value)
    .then(() => openBasicPopup({
      title: "Success",
      description: `${formatString.capitalize(elementId)} copied to clipboard.`
    }))
    .catch(() => openBasicPopup({
      title: "Error",
      description: `Failed to copy ${elementId} to clipboard. Please, try again.`
    }))
}

export default _copyToClipboard
