import { LuCopy } from "react-icons/lu"
import classNames from "classnames"
import { useTheme, useForm } from "../../hooks"
import { copyToClipboard } from "../../utils"

const Button = ({ variant, full, copy, ...rest }) => {
  const { lightMode } = useTheme()
  const { submitted } = useForm()

  if (rest.type === "submit") {
    submitted === null && (rest.children = "Save", variant = "gradient") ||
    !submitted && (rest.children = "Error", variant = "danger") ||
    submitted && (rest.children = "Updated!", variant = "success")
    full = true
  }

  if (rest.type === "reset") {
    rest.children = "Discard changes"
  }

  if (copy) {
    rest["aria-label"] = `Copy ${copy} to clipboard`
    rest.onClick = () => copyToClipboard(copy)
    rest.children = <LuCopy />
    variant = "icon"
  }

  return (
    <button
      {...rest}
      type={rest.type || "button"}
      aria-disabled={rest.disabled}
      className={classNames(
        rest.className,
        {
          "w-full": full,
          "rounded-shape text-center px-2 py-1": !variant || variant !== "icon",
          "bg-medium-light": lightMode && !variant,
          "bg-medium-dark": !lightMode && !variant,
          "bg-gradient-instagram text-light font-semibold": variant === "gradient",
          "bg-accent text-light": variant === "primary",
          "bg-success text-dark": variant === "success",
          "bg-danger text-light": variant === "danger",
          "hover:bg-medium hover:bg-opacity-10 focus-visible:bg-medium focus-visible:bg-opacity-10": variant === "icon",
          "rounded-shape absolute top-0.5 right-0.5 p-2": copy,
          "max-w-[50%]": rest.type === "submit",
          "bg-transparent font-semibold text-danger": rest.type === "reset",
        }
      )}
    />
  )
}

export default Button
