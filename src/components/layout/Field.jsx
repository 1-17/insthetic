import { createElement, useEffect, useState } from "react"
import { LuX } from "react-icons/lu"
import classNames from "classnames"
import { useTheme, useForm } from "../../hooks"
import { capitalizeString } from "../../utils"
import Button from "./Button"

const Field = ({ textarea, select, copy, ...rest }) => {
  const { lightMode } = useTheme()
  const { errors, validateField, clearFieldError } = useForm()

  const initialSelectFieldOptions = () => {
    if (select && select.defaultValue) {
      if (typeof select.defaultValue === "string") {
        return [select.defaultValue]
      }

      return select.defaultValue.flat()
    }

    return []
  }

  const isTextField = field => field.hasAttribute("name") && (field.tagName === "INPUT" || field.tagName === "TEXTAREA")
  const createIsEmptyObject = (prev, field) => ({ ...prev, [field.name]: !field.value })

  const [isEmpty, setIsEmpty] = useState({})
  const [length, setLength] = useState(-1)
  const [selectFieldOptions, setSelectedFieldOptions] = useState(initialSelectFieldOptions)

  useEffect(() => {
    setIsEmpty(Array.from(document.forms[0].elements).filter(isTextField).reduce(createIsEmptyObject, {}))
  }, [])

  const updateIsEmpty = e => setIsEmpty(prev => isTextField(e.target) && createIsEmptyObject(prev, e.target))

  const updateLength = e => rest.maxLength && setLength(rest.maxLength - e.target.value.length)
  const clearLength = () => setLength(null)

  const updateSelectFieldOptions = e => {
    setSelectedFieldOptions(prev =>[
      ...prev,
      ...Array.from(e.target.selectedOptions, option => option.value)
    ])
  }

  const deleteSelectFieldOption = optionToRemove => {
    setSelectedFieldOptions(
      selectFieldOptions.filter(option => option !== optionToRemove)
    )
  }

  const element = (textarea && "textarea") || (select && "select") || "input"

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
            element,
            {
              ...rest,
              id: rest.name,
              ...textarea && { cols: 10, rows: 2 },
              ...element === "input" && { type: rest.type || "text" },
              ...select && {
                size: 3,
                ...(select.defaultValue && typeof select.defaultValue === "object") && { multiple: true },
                ...select.options && { value: selectFieldOptions }
              },
              ...rest.required && { required: true, "aria-required": true },
              ...errors[rest.name] && { invalid: "true", "aria-invalid": "true", "aria-describedby": `${rest.name}-hint` },
              onBlur: e => {
                validateField(e)
                clearLength()
              },
              onChange: e => {
                (select && select.options) && updateSelectFieldOptions(e)
                updateIsEmpty(e)
                updateLength(e)
                clearFieldError(e)
              },
              className: classNames(
                "border-2 focus-visible:border-current focus-visible:outline-none rounded-shape w-full",
                {
                  "bg-light": lightMode,
                  "bg-dark": !lightMode,
                  "border-medium-light": lightMode && !errors[rest.name],
                  "border-medium-dark": !lightMode && !errors[rest.name],
                  "border-current": errors[rest.name],
                  "resize-none": textarea,
                  "px-2 py-1": !select,
                  "pr-8": copy,
                  "pl-6": rest.name === "username",
                  "hidden": select && (select.maxOptions === selectFieldOptions.length)
                }
              )
            },
            (select && select.options) && (
              select.options.map((option, i) =>
                <option
                  key={i}
                  value={option}
                  className={classNames(
                    "cursor-pointer px-2 py-1",
                    {
                      "hover:bg-medium-light": lightMode,
                      "hover:bg-medium-dark": !lightMode,
                      "hidden": selectFieldOptions.includes(option)
                    }
                  )
                }>
                  {option}
                </option>
              )
            )
          )
        }
        {
          ((select && select.options) && selectFieldOptions.length > 0) && (
            <>
              {
                (rest.name === "pronouns" && isEmpty.name) && (
                  <span className="block text-warning font-semibold">
                    Name is empty, so the pronouns will not be shown on profile.
                  </span>
                )
              }
              {
                (select.maxOptions && select.maxOptions === selectFieldOptions.length) && (
                  <span className="text-warning font-semibold">
                    Max options reached.
                  </span>
                )
              }
              <ul className="*:inline *:ml-2 first:*:ml-0 mt-2">
                {
                  selectFieldOptions.map((option, i) =>
                    <li key={i}>
                      <Button
                        aria-label="Delete option"
                        onClick={() => deleteSelectFieldOption(option)}
                        className="relative pt-2 pl-3 pr-4"
                      >
                        <LuX className="absolute top-0.5 right-0.5 text-sm" />
                        {option}
                      </Button>
                    </li>
                  )
                }
              </ul>
            </>
          )
        }
        {
          (copy && !errors[rest.name] && !isEmpty[rest.name]) && (
            <Button copy={rest.name} />
          )
        }
        {
          length > -1 && (
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
