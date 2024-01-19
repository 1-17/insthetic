import { createElement } from "react"
import classNames from "classnames"
import { useTheme } from "../../hooks"

const Button = ({ main, ...rest }) => {
  const { lightMode } = useTheme()

  return (
    createElement(
      (rest.onClick || rest.type) ? "button" : "span",
      {
        ...rest,
        type: rest.type || "button",
        className: classNames(
          "rounded-md text-center w-full px-2 py-[0.3rem]",
          rest.className,
          {
            "bg-sky-600 text-light": main,
            "bg-dark": lightMode,
            "bg-light": !lightMode,
            "bg-opacity-10": !main
          }
        )
      }
    )
  )
}

export default Button
