import { formatUserMetrics } from "../../utils"

const Metrics = () => {
  return (
    <ul className="grow flex justify-evenly text-center gap-2">
      {
        formatUserMetrics().map((metric, i) =>
          <li key={i}>
            <span className="block text-lg sm:text-xl font-semibold">
              {metric.number}
            </span>
            {metric.name}
          </li>
        )
      }
    </ul>
  )
}

export default Metrics
