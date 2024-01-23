import { createElement, useState } from "react"
import { LuCopy } from "react-icons/lu"
import classNames from "classnames"
import { useForm } from "../../hooks"
import { capitalizeString, copyToClipboard } from "../../utils"

const Field = ({ textarea, copy, ...rest }) => {
  const { errors, handleUserValidations, clearErrors } = useForm()
  const [length, setLength] = useState("")

  return (
    <div className="w-full">
      <label htmlFor={rest.name} className="leading-loose">
        {capitalizeString(rest.name)}
      </label>
      <div className="relative">
        {
          rest.name === "username" && (
            <span className="absolute top-1 left-2 font-semibold">
              @
            </span>
          )
        }
        {
          createElement(
            textarea ? "textarea" : "input",
            {
              ...rest,
              id: rest.name,
              ...textarea && { cols: 10, rows: 2 },
              ...!textarea && { type: rest.type || "text" },
              ...rest.required && { required: true, "aria-required": true },
              ...errors[rest.name] && { invalid: "true", "aria-invalid": "true", "aria-describedby": `${rest.name}-hint` },
              onBlur: e => (handleUserValidations(e), setLength(null)),
              onChange: e => (clearErrors(), rest.maxLength && setLength(rest.maxLength - e.target.value.length)),
              className: classNames(
                "bg-medium bg-opacity-25 rounded-md w-full px-2 py-1",
                {
                  "resize-none": textarea,
                  "pl-6": rest.name === "username",
                  "pr-8": copy,
                  "outline outline-danger": errors[rest.name]
                }
              )
            }
          )
        }
        {
          copy && (
            <button
              type="button"
              aria-label={`Copy ${rest.name} to clipboard`}
              onClick={() => copyToClipboard(rest.name, document.getElementById(rest.name).value)}
              className="rounded-md absolute top-0 right-0 p-2"
            >
              <LuCopy />
            </button>
          )
        }
        {
          (length !== null) && (
            <span className={classNames(
              "text-xs sm:text-sm", { "text-warning": length <= 5 && length > 0, "text-danger": length === 0 })}>
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
