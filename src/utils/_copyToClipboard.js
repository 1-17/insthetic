import { capitalizeString } from "."

const _copyToClipboard = (elementId, openBasicPopup) => {
  if (elementId) {
    return navigator.clipboard.writeText(document.getElementById(elementId).value)
      .then(() => openBasicPopup({ title: "Success", description: `${capitalizeString(elementId)} copied to clipboard!` }))
      .catch(() => openBasicPopup({ title: "Error", description: `Failed to copy ${elementId} to clipboard. Please, try again.` }))
  }
  
  throw new Error("Copy to Clipboard: Missing element id argument.")
}

export default _copyToClipboard
