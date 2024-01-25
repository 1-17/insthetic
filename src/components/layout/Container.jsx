import { createElement } from "react"
import classNames from "classnames"

const Container = ({ element, ...rest }) => {
  return (
    createElement(
      element || "div",
      {
        ...rest,
        className: classNames(
          rest.className,
          "w-full max-w-screen-sm mx-auto px-3"
        )
      }
    )
  )
}

export default Container
