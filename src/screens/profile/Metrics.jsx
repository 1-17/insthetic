import { FormattedUserMetrics } from "../../models"

const Metrics = () => {
  const metrics = new FormattedUserMetrics()

  return (
    <ul className="grow flex justify-evenly gap-2 text-center">
      {
        metrics.map((metric, i) =>
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
