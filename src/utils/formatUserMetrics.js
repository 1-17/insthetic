import { useUser } from "../hooks"
import { capitalizeString } from "."

const _formatUserMetrics = () => {
  const { user } = useUser()
  const metrics = ["posts", "followers", "following"]

  return (
    metrics.map(metricName => {
      let metricNumber = user[metricName]
      
      switch (true) {
        case metricNumber > 999 && metricNumber <= 9999:
          metricNumber = (metricNumber / 1000)
          metricNumber = (
            metricNumber % 1000 === 0
              ? metricNumber + "k"
              : metricNumber
          )
          break

        case metricNumber > 9999 && metricNumber <= 99999:
          metricNumber = (metricNumber / 1000).toLocaleString()
          metricNumber = (
            metricNumber.charAt(3) === "0"
              ? Math.floor(parseInt(metricNumber))
              : metricNumber.slice(0, 4)
          ) + " mil"
          break
        
        case metricNumber > 99999 && metricNumber <= 999999:
          metricNumber = Math.floor(metricNumber / 1000) + " mil"
          break

        case metricNumber > 999999 && metricNumber <= 9999999:
          metricNumber = (metricNumber / 1000000).toFixed(1).toString().replace(".", ",")
          metricNumber = (
            metricNumber.endsWith("0")
             ? metricNumber.split(",", 1)
             : metricNumber.split(",", 2)
          ) + " M"
          break
        
        case metricNumber > 9999999:
          metricNumber = Math.floor(metricNumber / 1000000) + " M"
          break
      }

      return {
        name: capitalizeString(metricName),
        number: metricNumber.toLocaleString()
      }
    })
  )
}

export default _formatUserMetrics
