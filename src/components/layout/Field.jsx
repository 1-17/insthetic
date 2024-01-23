import { createElement, useState } from "react"
import { LuCopy } from "react-icons/lu"
import classNames from "classnames"
import { useForm, useTheme } from "../../hooks"
import { capitalizeString, copyToClipboard } from "../../utils"
import Button from "./Button"

const Field = ({ textarea, select, copy, ...rest }) => {
  const { lightMode } = useTheme()
  const { errors, handleValidations } = useForm()
  const [length, setLength] = useState(null)

  const updateLength = e => rest.maxLength && setLength(rest.maxLength - e.target.value.length)
  const clearLength = () => setLength(null)

  return (
    <div className="w-full">
      <label htmlFor={rest.name} className="leading-loose">
        {capitalizeString(rest.name)}
      </label>
      <div className={classNames("relative", { "text-danger": errors[rest.name] })}>
        {
          rest.name === "username" && (
            <span className="absolute top-1 left-2 font-semibold">
              @
            </span>
          )
        }
        {
          createElement(
            (textarea && "textarea") || (select && "select") || "input",
            {
              ...rest,
              id: rest.name,
              ...textarea && { cols: 10, rows: 2 },
              ...(!textarea && !select) && { type: rest.type || "text" },
              ...rest.required && { required: true, "aria-required": true },
              ...errors[rest.name] && { invalid: "true", "aria-invalid": "true", "aria-describedby": `${rest.name}-hint` },
              onBlur: e => (handleValidations(e), clearLength()),
              onChange: e => (handleValidations(e), updateLength(e)),
              className: classNames(
                "border-2 rounded-shape w-full px-2 py-1 focus-visible:outline-none focus-visible:border-current",
                {
                  "bg-light": lightMode,
                  "bg-dark": !lightMode,
                  "border-medium-light": lightMode && !errors[rest.name],
                  "border-medium-dark": !lightMode && !errors[rest.name],
                  "border-current": errors[rest.name],
                  "resize-none": textarea,
                  "pr-8": copy,
                  "pl-6": rest.name === "username",
                }
              )
            },
            select && (
              select.map((option, i) =>
                <option key={i} value={option}>
                  {option}
                </option>
              )
            )
          )
        }
        {
          (copy && !errors[rest.name]) && (
            <Button
              aria-label={`Copy ${rest.name} to clipboard`}
              onClick={() => copyToClipboard(rest.name, document.getElementById(rest.name).value)}
              variant="icon"
              className="rounded-shape absolute top-0.5 right-0.5 p-2"
            >
              <LuCopy />
            </Button>
          )
        }
        {
          length !== null && (
            <span className={classNames(
              "text-xs sm:text-sm",
              {
                "text-warning": length <= 5 && length > 0,
                "text-danger": length === 0
              }
            )}>
              {length}
            </span>
          )
        }
      </div>
      {
        errors[rest.name] && (
          <p id={`${rest.name}-hint`} role="alert" className="text-danger font-semibold mt-1">
            {errors[rest.name]}
          </p>
        )
      }
    </div>
  )
}

export default Field
