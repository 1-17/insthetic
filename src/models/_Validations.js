import User from "./_User"
import regex from "./_regex"

class _Validations extends User {
  constructor() {
    super()

    this.username = (field, username) => {
      if (!username) {
        return `${field} is required.`
      }

      if (regex.numbersOnly.test(username)) {
        return `${field} cannot have only numbers.`
      }

      if (username.startsWith(".")) {
        return `${field} cannot start with a dot.`
      }

      if (username.endsWith(".")) {
        return `${field} cannot end with a dot.`
      }

      if (regex.consecutiveDots.test(username)) {
        return `${field} cannot have consecutive dots.`
      }

      if (!regex.username.test(username)) {
        return `${field} can only contain letters with no accent, numbers, underscores and dots.`
      }

      return null
    }
    
    this.threads = (field, threads) => {
      if (threads) {
        if (regex.numbersOnly.test(threads)) {
          return `${field} cannot have only numbers.`
        }
  
        if (threads.startsWith(".")) {
          return `${field} cannot start with a dot.`
        }
  
        if (threads.endsWith(".")) {
          return `${field} cannot end with a dot.`
        }
  
        if (regex.consecutiveDots.test(threads)) {
          return `${field} cannot have consecutive dots.`
        }
  
        if (!regex.username.test(threads)) {
          return `${field} can only contain letters with no accent, numbers, underscores and dots.`
        }
      }

      return null
    }

    this.link = (_field, link) => {
      if (link && !regex.link.test(link)) {
        return "Insert a valid URL."
      }

      return null
    }

    this.posts = (field, posts) => {
      if (!regex.numbersOnly.test(posts)) {
        return `${field} must have only numbers.`
      }

      return ""
    }

    this.followers = (field, followers) => {
      if (!regex.numbersOnly.test(followers)) {
        return `${field} must have only numbers.`
      }

      return ""
    }

    this.following = (field, following) => {
      if (!regex.numbersOnly.test(following)) {
        return `${field} must have only numbers.`
      }

      return ""
    }
  }
}

export default _Validations
