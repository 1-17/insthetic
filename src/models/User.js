class User {
  username
  name
  pronouns
  threads
  label
  bio
  verified
  private
  posts
  followers
  following
  link
  shop
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
    this.username = "117k",
    this.name = "117k",
    this.pronouns = "he/him",
    this.threads = "117k",
    this.label = "Developer",
    this.bio = "love yourself so no one has to. also, @this_is_a_mention and #this_is_a_hashtag.",
    this.verified = true,
    this.private = true,
    this.posts = 0,
    this.followers = 10199,
    this.following = 567,
    this.link = "https://github.com/1-17",
    this.shop = true,
    this.contact = "Email",
    this.suggestions = true,
    this.avatar = null,
    this.stories = true,
    this.highlights = [
      {
        image: "",
        description: "Highlight"
      },
      {
        image: "",
        description: "Highlight"
      },
      {
        image: "",
        description: "Highlight"
      },
      {
        image: "",
        description: "Highlight"
      },
      {
        image: "",
        description: "Highlight"
      },
      {
        image: "",
        description: "Highlight"
      }
    ]
  }
}

export default User
