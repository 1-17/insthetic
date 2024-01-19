class Validations {
  username
  name
  pronouns
  threads
  label
  bio
  verified
  posts
  followers
  following
  link
  contact
  suggestions
  avatar
  stories
  highlights = [
    {
      image: "",
      description: ""
    }
  ]

  constructor() {
    this.username = username => {
      if (!username) {
        return "Username is required."
      }

      return ""
    }

    this.name = name => {
      if (!name) {
        return "Name is required."
      }

      return ""
    }
  }
}

export default Validations
