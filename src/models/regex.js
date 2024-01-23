const regex = {
  username: /^(?!.*\.{2,}|^\d+$)[a-zA-Z0-9_]{1,30}$/,
  numbersOnly: /^\d+$/,
  consecutiveDots: /\.{2,}/,
  link: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
}

export default regex
