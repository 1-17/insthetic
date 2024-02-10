import User from "./_User"

class _InitialUser extends User {
  constructor() {
    super()
    
    this.username = "117k",
    this.name = "117k",
    this.pronouns = ["he", "him"],
    this.threads = "117k",
    this.label = "Developer",
    this.bio = "love yourself so no one has to. also, @this_is_a_mention and #this_is_a_hashtag.",
    this.verified = true,
    this.posts = [],
    this.followers = 1234,
    this.following = 567,
    this.link = "https://github.com/1-17",
    this.contact = "Email",
    this.suggestions = true,
    this.avatar = null,
    this.stories = true,
    this.highlights = [
      {
        id: 1,
        cover: "src/assets/images/default-image.svg",
        description: "Highlights"
      }
    ]
  }
}

export default _InitialUser
