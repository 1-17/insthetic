const _formatString = {}

_formatString.capitalize = string => {
  if (!string) {
    throw new Error("Capitalize: Missing string argument.")
  }

  const firstLetterToUpperCase = string.charAt(0).toUpperCase()
  const isNotCapitalized = !string.startsWith(firstLetterToUpperCase)

  if (isNotCapitalized) {
    return firstLetterToUpperCase + string.slice(1)
  }
  
  return string
}

_formatString.splitAndCapitalizeCamelCase = camelCaseString => {
  if (!camelCaseString) {
    throw new Error("camelCase to Sentence: Missing string argument.")
  }

  const lowerCaseToUpperCaseTransition = /([a-z])([A-Z])/g
  const spaceBetweenTransition = "$1 $2"
  const splittedCamelCaseString = camelCaseString.replace(lowerCaseToUpperCaseTransition, spaceBetweenTransition)

  return _formatString.capitalize(splittedCamelCaseString)
}

export default _formatString
