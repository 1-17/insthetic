import classNames from "classnames"

const Stack = ({ ...rest }) => {
  return (
    <div {...rest} className={classNames("flex gap-4", rest.className)} />
  )
}

export default Stack
