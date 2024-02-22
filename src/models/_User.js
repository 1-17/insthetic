class User {
  username
  name
  pronouns
  threads
  category
  bio
  verified
  posts = [
    {
      id: 0,
      image: ""
    }
  ]
  followers
  following
  link
  contact
  suggestions
  avatar
  stories
  highlights = [
    {
      id: 0,
      cover: "",
      description: ""
    }
  ]
}

export default User
