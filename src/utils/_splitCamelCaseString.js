import { capitalizeString } from "."
import { regex } from "../models"

const _splitCamelCaseString = string => {
  if (!string) {
    throw new Error("Split camelCase String: Missing string argument.")
  }

  const uppercaseIndex = string.search(regex.uppercaseLetters)

  if (uppercaseIndex > 0) {
    const firstWord = string.slice(0, uppercaseIndex)
    const secondWord = string.slice(uppercaseIndex)

    return capitalizeString(firstWord) + " " + secondWord.toLowerCase()
  }

  if (!regex.uppercaseLetters.test(string.charAt(0))) {
    return capitalizeString(string)
  }

  return string
}

export default _splitCamelCaseString
