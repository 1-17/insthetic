import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { LuCopy } from "react-icons/lu"
import classNames from "classnames"
import { useTheme } from "../../hooks"
import { copyToClipboard } from "../../utils"

const Button = ({ variant, full, copy, ...rest }) => {
  const { lightMode } = useTheme()
  const { reset, formState: { isSubmitted, isSubmitSuccessful } } = useFormContext()

  useEffect(() => {
    const clearSubmitButtonState = setTimeout(() =>
      reset(undefined, { keepValues: true, keepErrors: true }
    ), 1500)

    return () => clearTimeout(clearSubmitButtonState)
  }, [isSubmitted])

  if (rest.type === "submit") {
    rest.children = "Save"
    variant = "gradient"
    full = true

    if (isSubmitted) {
      rest.disabled = true
      
      isSubmitSuccessful
        ? (rest.children = "Updated!", variant = "success")
        : (rest.children = "Error", variant = "danger")
    }
  }

  if (rest.type === "reset") {
    rest.children = "Discard changes"
    rest.onClick = e => {
      e.preventDefault()
      reset()
    }
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
          "xs:max-w-[50%]": rest.type === "submit",
          "bg-transparent font-semibold text-danger": rest.type === "reset",
        }
      )}
    />
  )
}

export default Button
