import classNames from "classnames"
import { useComponent } from "../../hooks"

const Stack = ({ ...rest }) => {
  const { profile } = useComponent()

  return (
    <div
      {...rest}
      className={classNames(
        rest.className,
        "flex",
        {
          "max-xs:flex-wrap gap-2": profile,
          "max-[400px]:flex-wrap gap-4": !profile
        },
      )}
    />
  )
}

export default Stack
