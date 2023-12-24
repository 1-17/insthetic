import { useUser } from "../hooks"

const formatUserMetrics = () => {
  const { user } = useUser()
  const metrics = ["posts", "followers", "following"]

  return (
    metrics.map(metricName => {
      let metricNumber = user[metricName]

      switch (true) {
        case metricNumber >= 1000 && metricNumber <= 9000 && metricNumber % 1000 === 0:
          metricNumber = (metricNumber / 1000).toFixed(1) + " k"
          break

        case metricNumber > 10000 && metricNumber < 999999:
          metricNumber = (metricNumber / 1000).toFixed(1) + " mil"
          break

        case metricNumber > 1000000:
          metricNumber = (metricNumber / 1000000).toFixed(1) + " M"
          break
      }

      return {
        name: metricName.charAt(0).toUpperCase() + metricName.slice(1),
        number: metricNumber.toLocaleString()
      }
    })
  )
}

export default formatUserMetrics
