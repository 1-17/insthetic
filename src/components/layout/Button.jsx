import { createElement } from "react"
import classNames from "classnames"
import { useForm, useTheme } from "../../hooks"

const Button = ({ variant, ...rest }) => {
  const { lightMode } = useTheme()
  const { formUpdated } = useForm()

  rest.type === "submit" && (
    formUpdated === null && (rest.children = "Save", variant = "gradient") ||
    !formUpdated && (rest.children = "Error", variant = "danger") ||
    formUpdated && (rest.children = "Updated!", variant = "success")
  )

  return (
    createElement(
      (rest.onClick || rest.type) ? "button" : "span",
      {
        ...rest,
        type: rest.type || "button",
        className: classNames(
          rest.className,
          {
            "rounded-shape text-center w-full px-2 py-1": !variant || variant !== "icon",
            "bg-medium-light": lightMode && !variant,
            "bg-medium-dark": !lightMode && !variant,
            "bg-gradient-instagram text-light": variant === "gradient",
            "bg-accent text-light": variant === "primary",
            "bg-success text-dark": variant === "success",
            "bg-danger text-light": variant === "danger",
            "hover:bg-medium hover:bg-opacity-10 focus-visible:bg-medium focus-visible:bg-opacity-10": variant === "icon",
            "font-semibold max-w-[60%] mt-4": rest.type === "submit"
          }
        )
      }
    )
  )
}

export default Button
