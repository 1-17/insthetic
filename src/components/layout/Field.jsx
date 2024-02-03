import { createElement, createRef, forwardRef, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { LuX } from "react-icons/lu"
import { FaChevronDown } from "react-icons/fa6"
import classNames from "classnames"
import { useTheme } from "../../hooks"
import { capitalizeString } from "../../utils"
import Button from "./Button"

const Field = forwardRef(({ label, textarea, select, copy, ...rest }, _ref) => {
  const { lightMode } = useTheme()
  const { watch, getValues, setValue, formState: { errors } } = useFormContext()

  const element = (textarea && "textarea") || (select && "select") || "input"
  const isCopyButtonValid = (copy && !errors[rest.name]) && watch(rest.name)
  const nameFieldIsEmpty = !watch("name")
  const multipleSelectValues = (select && rest.multiple) && getValues(rest.name)

  const [fieldLength, setFieldLength] = useState(-1)
  // const [selectFieldOptions, setSelectFieldOptions] = useState((select && select.multiple) && select.defaultValue || [])

  useEffect(() => {
    if (rest.maxLength) {
      const field = document.getElementById(rest.name)

      const updateFieldLength = e => setFieldLength(rest.maxLength - e.target.value.length)
      const clearFieldLength = () => setFieldLength(-1)

      field.addEventListener("focus", updateFieldLength)
      field.addEventListener("input", updateFieldLength)
      field.addEventListener("blur", clearFieldLength)

      return () => {
        field.removeEventListener("focus", updateFieldLength)
        field.removeEventListener("input", updateFieldLength)
        field.removeEventListener("blur", clearFieldLength)
      }
    }
  }, [])

  // const updateSelectFieldOptions = e => {
  //   if (select.multiple) {
  //     return setSelectFieldOptions(prev => [
  //       ...prev,
  //       ...Array.from(e.target.selectedOptions, option => option.value)
  //     ])
  //   }

  //   setSelectFieldOption(e.target.value)
  // }

  // const deleteSelectFieldOption = optionToRemove => {
  //   setSelectFieldOptions(
  //     selectFieldOptions.filter(option => option !== optionToRemove)
  //   )
  // }

  const fileButton = createRef()

  const enableFileButtonClick = e => {
    e.preventDefault()
    
    if (e.code === "Space" || e.key === "Enter") {
      fileButton.current.click()
    }
  }

  return (
    <div className="w-full">
      <label
        htmlFor={rest.name}
        {...rest.type === "file"
          ? {
            tabIndex: 0,
            role: "button",
            "aria-haspopup": "dialog",
            onKeyDown: enableFileButtonClick,
            className: "block bg-accent rounded-shape cursor-pointer text-light text-center px-2 py-1"
          }
          : { className: "leading-loose" }
        }
      >
        {label || capitalizeString(rest.name)}
      </label>
      <div className={classNames(
        "relative",
        {
          "text-danger": errors[rest.name],
          "inline ml-4": rest.type === "checkbox",
          "hidden": rest.type === "file"
        }
      )}>
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
              ...element === "textarea" && { cols: 10, rows: 2 },
              ...element === "input" && {
                type: rest.type || "text",
                ...rest.type === "file" && { ref: fileButton }
              },
              ...element === "select" && {
                ...rest.multiple && {
                  size: 3,
                  onChange: e => setValue(rest.name, [...multipleSelectValues, e.target.value].sort())
                },
                style: { WebkitAppearance: "none", MozAppearance: "none" }
              },
              // ...(select && select.options) && {
              //   ...select.multiple ? {
              //     value: selectFieldOptions,
              //     multiple: true,
              //     size: 3
              //   } : {
              //     value: selectFieldOption
              //   },
              //   onChange: updateSelectFieldOptions
              // },
              ...rest.required && { required: true, "aria-required": true },
              ...errors[rest.name] && { invalid: "true", "aria-invalid": "true", "aria-describedby": `${rest.name}-hint` },
              ...!["checkbox", "file"].includes(rest.type) && {
                className: classNames(
                  "border-2 focus-visible:border-current focus-visible:outline-none rounded-shape w-full",
                  {
                    "bg-light": lightMode,
                    "bg-dark": !lightMode,
                    "border-medium-light": lightMode && !errors[rest.name],
                    "border-medium-dark": !lightMode && !errors[rest.name],
                    "border-current": errors[rest.name],
                    "resize-none": element === "textarea",
                    "appearance-none": element === "select",
                    "px-2 py-1": !(element === "select" && rest.multiple),
                    // "px-2 py-1": !(select && select.multiple),
                    "hidden": element === "select" && rest.multiple && (select.maxOptions === (multipleSelectValues && multipleSelectValues.length)),
                    // "hidden": select && (select.multiple && select.maxOptions === selectFieldOptions.length),
                    "pr-8": copy,
                    "pl-6": rest.name === "username"
                  }
                )
              }
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
                      "hidden": (multipleSelectValues && multipleSelectValues.includes(option))
                      // "hidden": (select.multiple && selectFieldOptions.includes(option))
                    }
                  )}
                >
                  {option}
                </option>
              )
            )
          )
        }
        {
          select && (
            <>
              {
                !rest.multiple /*!select.multiple*/ && (
                  <FaChevronDown className="absolute top-2.5 right-2" />
                )
              }
              {
                (select.options && multipleSelectValues && multipleSelectValues.length > 0)
                /*((select.options && select.multiple) && selectFieldOptions.length > 0)*/ && (
                  <>
                    {
                      nameFieldIsEmpty && (
                        <span className="block text-warning font-semibold">
                          Name is empty, so the pronouns will not be shown on profile.
                        </span>
                      )
                    }
                    {
                      (select.maxOptions && select.maxOptions === multipleSelectValues.length/*selectFieldOptions.length*/) && (
                        <span className="block text-warning font-semibold">
                          Max options reached.
                        </span>
                      )
                    }
                    <ul className="*:inline *:ml-2 first:*:ml-0 mt-2">
                      {
                        multipleSelectValues/*selectFieldOptions*/.map((option, i) =>
                          <li key={i}>
                            <Button
                              aria-label="Delete option"
                              onClick={() => setValue(rest.name, multipleSelectValues.filter(value => value !== option))
                              /*() => deleteSelectFieldOption(option)*/}
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
            </>
          )
        }
        {
          isCopyButtonValid && (
            <Button copy={rest.name} />
          )
        }
        {
          fieldLength > -1 && (
            <span className={classNames(
              "text-xs sm:text-sm",
              {
                "text-warning": fieldLength <= 5 && fieldLength > 0,
                "text-danger": fieldLength === 0
              }
            )}>
              {fieldLength}
            </span>
          )
        }
      </div>
      {
        errors[rest.name] && (
          <p id={`${rest.name}-hint`} role="alert" className="text-danger font-semibold mt-1">
            {errors[rest.name].message}
          </p>
        )
      }
    </div>
  )
})

export default Field
