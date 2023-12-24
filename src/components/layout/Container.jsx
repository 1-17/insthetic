import { createElement } from "react"
import classNames from "classnames"

const Container = ({ element, ...rest }) => {
  return (
    createElement(
      element || "div",
      {
        ...rest,
        className: classNames(
          "w-full max-w-screen-sm mx-auto px-3",
          rest.className
        )
      }
    )
  )
}

export default Container
