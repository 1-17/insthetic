import classNames from "classnames"
import { useComponent } from "../../hooks"

const Stack = ({ ...rest }) => {
  const { profile, config } = useComponent()

  return (
    <div {...rest} className={classNames(
      "flex",
      rest.className,
      {
        "max-xs:flex-wrap gap-2": profile,
        "max-[400px]:flex-wrap gap-4": config
      },
    )} />
  )
}

export default Stack
