import { createElement } from "react"
import classNames from "classnames"
import { useForm, useTheme } from "../../hooks"

const Button = ({ variant, ...rest }) => {
  const { lightMode } = useTheme()
  const { formUpdated } = useForm()

  rest.type === "submit" && (
    formUpdated === null && (rest.children = "Submit", variant = "gradient") ||
    formUpdated === false && (rest.children = "Error", variant = "danger") ||
    formUpdated === true && (rest.children = "Updated!", variant = "success")
  )

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
            "bg-dark": lightMode,
            "bg-light": !lightMode,
            "bg-opacity-10": !variant,
            "bg-gradient-instagram text-light": variant === "gradient",
            "bg-sky-600 text-light": variant === "primary",
            "bg-green-500 text-dark": variant === "success",
            "bg-danger text-light": variant === "danger",
            "font-semibold max-w-[60%] mt-4 transition-colors": rest.type === "submit"
          }
        )
      }
    )
  )
}

export default Button
