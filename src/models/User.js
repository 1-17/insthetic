class User {
  username
  name
  pronouns
  threads
  label
  bio
  isVerified
  posts
  followers
  following
  link
  contact
  hasSuggestionsEnabled
  avatar
  hasStories
  highlights = [
    {
      image: "",
      description: ""
    }
  ]

  constructor() {
    this.username = "117k",
    this.name = "117k",
    this.pronouns = ["he", "him"],
    this.threads = "117k",
    this.label = "Developer",
    this.bio = "love yourself so no one has to. also, @this_is_a_mention and #this_is_a_hashtag.",
    this.isVerified = true,
    this.posts = 0,
    this.followers = 1234,
    this.following = 567,
    this.link = "https://github.com/1-17",
    this.contact = "Email",
    this.hasSuggestionsEnabled = true,
    this.avatar = null,
    this.hasStories = true,
    this.highlights = [
      {
        image: "",
        description: ""
      },
      {
        image: "",
        description: ""
      },
      {
        image: "",
        description: ""
      },
      {
        image: "",
        description: ""
      },
      {
        image: "",
        description: ""
      },
      {
        image: "",
        description: ""
      }
    ]
  }
}

export default User
