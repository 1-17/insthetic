import User from "./_User"
import regex from "./_regex"

class _Validations extends User {
  constructor() {
    super()

    const usernameValidation = (field, username) => {
      if (username) {
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
      }

      return null
    }

    const metricsValidation = (field, metric) => {
      if (!regex.numbersOnly.test(metric)) {
        return `${field} must have only numbers.`
      }

      return null
    }

    this.username = (field, username) => {
      if (!username) {
        return `${field} is required.`
      }

      return usernameValidation(field, username)
    }
    
    this.threads = usernameValidation

    this.link = (_field, link) => {
      if (link && !regex.link.test(link)) {
        return "Insert a valid URL."
      }

      return null
    }

    this.posts = metricsValidation
    this.followers = metricsValidation
    this.following = metricsValidation
  }
}

export default _Validations
