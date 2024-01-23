const regex = {
  username: /^[a-zA-Z0-9._]+$/,
  numbersOnly: /^\d+$/,
  consecutiveDots: /\.{2,}/,
  link: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/igm
}

export default regex
