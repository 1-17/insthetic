import classNames from "classnames"

const Stack = ({ fields, submit, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames(
        rest.className,
        "flex",
        {
          "gap-4": fields,
          "max-xs:flex-wrap xs:justify-between max-xs:gap-2": submit
        }
      )}
    />
  )
}

export default Stack
