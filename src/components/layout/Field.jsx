import { createElement } from "react"
import { LuCopy } from "react-icons/lu"
import classNames from "classnames"
import { useForm } from "../../hooks"
import { capitalizeString, copyToClipboard } from "../../utils"

const Field = ({ element, copy, ...rest }) => {
  const { errors } = useForm()

  return (
    <div className="w-full">
      <label htmlFor={rest.name} className="leading-loose">
        {capitalizeString(rest.name)}
      </label>
      <div {...copy && { className: "flex" }}>
        {
          createElement(
            element || "input",
            {
              ...rest,
              ...element === "textarea" && {
                cols: 10,
                rows: 2
              },
              id: rest.name,
              "aria-required": rest.required,
              "aria-invalid": errors[rest.name],
              "aria-describedby": `${rest.name}-hint`,
              className: classNames(
                "bg-medium bg-opacity-25 border border-medium border-opacity-25 focus:border-current rounded-md w-full px-2 py-1 focus:outline-none",
                {
                  "resize-none": element === "textarea",
                  "rounded-r-none": copy,
                  "border-danger focus:border-danger": errors[rest.name]
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
              className="bg-medium bg-opacity-25 border border-l-0 border-medium border-opacity-25 hover:border-l hover:border-current rounded-r-md px-2"
            >
              <LuCopy />
            </button>
          )
        }
      </div>
      {
        errors[rest.name] && (
          <p id={`${rest.name}-hint`} role="alert" className="text-danger">
            {errors[rest.name]}
          </p>
        )
      }
    </div>
  )
}

export default Field
