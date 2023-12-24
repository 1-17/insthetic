import formatUserMetrics from "../../models/formatUserMetrics"

const Metrics = () => {
  const metrics = formatUserMetrics()

  return (
    <ul className="grow flex justify-evenly text-center gap-2">
      {metrics.map(m =>
        <li key={m.name}>
          <span className="block text-lg sm:text-xl font-semibold">
            {m.number}
          </span>
          {m.name}
        </li>
      )}
    </ul>
  )
}

export default Metrics
