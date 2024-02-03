import { useUser } from "../hooks"
import { capitalizeString } from "../utils"

class _FormattedUserMetrics {
  constructor() {
    const { user } = useUser()

    return (
      Object.entries(user)
        .filter(([key]) => ["posts", "followers", "following"].includes(key))
        .map(([key, value]) => {
          const number = typeof value === "number" ? value : value.length
          let formattedNumber

          switch (true) {
            case number > 999 && number <= 9999:
              formattedNumber = number % 1000 === 0 ? (number / 1000) + "k" : number.toLocaleString()
              break
    
            case number > 9999 && number <= 99999:
              formattedNumber = String(number)[2] === "0" ? String(number).slice(0, 2) : number.toLocaleString().slice(0, 4)
              formattedNumber = formattedNumber + " mil"
              break
            
            case number > 99999 && number <= 999999:
              formattedNumber = Math.floor(number / 1000) + " mil"
              break
    
            case number > 999999 && number <= 9999999:
              formattedNumber = String(number)[2] === "0" ? String(number).slice(0, 1) : number.toLocaleString().slice(0, 3).replace(".", ",")
              formattedNumber = formattedNumber + " M"
              break
            
            case number > 9999999:
              formattedNumber = String(number)[2] === "0" ? String(number).slice(0, 2) : number.toLocaleString().slice(0, 4).replace(".", ",")
              formattedNumber = formattedNumber + " M"
              break
          }

          return {
            name: capitalizeString(key),
            number: formattedNumber || number
          }
        })
    )
  }
}

export default _FormattedUserMetrics
