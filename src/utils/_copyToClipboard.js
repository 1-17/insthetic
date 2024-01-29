import { capitalizeString } from "."

const _copyToClipboard = (elementId) => {
  if (elementId) {
    return navigator.clipboard.writeText(document.getElementById(elementId).value)
      .then(() => alert(`${capitalizeString(elementId)} copied to clipboard!`))
      .catch(() => alert(`Failed to copy ${elementId} to clipboard. Please, try again.`))
  }
  
  throw new Error("Copy to Clipboard: Missing element id argument.")
}

export default _copyToClipboard
