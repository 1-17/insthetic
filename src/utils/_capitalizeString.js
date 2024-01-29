const _capitalizeString = string => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  throw new Error("Capitalize String: Missing string argument.")
}

export default _capitalizeString
