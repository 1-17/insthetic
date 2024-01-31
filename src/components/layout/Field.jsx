import { createElement, useEffect, useRef, useState } from "react"
import { LuX } from "react-icons/lu"
import { FaChevronDown } from "react-icons/fa6"
import classNames from "classnames"
import { useTheme, useForm } from "../../hooks"
import { capitalizeString } from "../../utils"
import Button from "./Button"

const Field = ({ label, textarea, select, checkbox, file, copy, ...rest }) => {
  const { lightMode } = useTheme()
  const { errors, validateField, clearFieldError } = useForm()

  /**
   * STATES
   */
  const [isEmpty, setIsEmpty] = useState({})
  const [length, setLength] = useState(-1)
  const [selectFieldOption, setSelectFieldOption] = useState((select && !select.multiple) && select.defaultValue || "")
  const [selectFieldOptions, setSelectFieldOptions] = useState((select && select.multiple) && select.defaultValue || [])
  const [checkboxChecked, setCheckboxChecked] = useState(checkbox && checkbox.defaultChecked)
  const [nameIsEmpty, setNameIsEmpty] = useState(null)

  /**
   * EFFECTS
   */
  const isTextField = field => field.hasAttribute("name") && (field.tagName === "INPUT" || field.tagName === "TEXTAREA")
  const createIsEmptyObject = (prev, field) => ({ ...prev, [field.name]: !field.value })
  
  useEffect(() => {
    setIsEmpty(
      Array.from(document.forms[0].elements)
        .filter(isTextField)
        .reduce(createIsEmptyObject, {})
    )
  }, [])

  useEffect(() => {
    setNameIsEmpty(isEmpty.name)

    const nameField = document.getElementById("name")
    const handleNameIsEmpty = e => setNameIsEmpty(!e.target.value)
    
    if (nameField) {
      nameField.addEventListener("input", handleNameIsEmpty)
      return () => nameField.removeEventListener("input", handleNameIsEmpty)
    }
  }, [isEmpty])

  useEffect(() => {
    if (checkbox && checkbox.state) {
      checkbox.state(prev => ({ ...prev, [rest.name]: checkboxChecked }))
    }
  }, [checkboxChecked])

  /**
   * STATES UPDATES
   */
  const updateIsEmpty = e => setIsEmpty(prev => isTextField(e.target) && createIsEmptyObject(prev, e.target))

  const updateLength = e => rest.maxLength && setLength(rest.maxLength - e.target.value.length)
  const clearLength = () => setLength(-1)

  const updateSelectFieldOptions = e => {
    if (select.multiple) {
      return setSelectFieldOptions(prev => [
        ...prev,
        ...Array.from(e.target.selectedOptions, option => option.value)
      ])
    }

    setSelectFieldOption(e.target.value)
  }

  const deleteSelectFieldOption = optionToRemove => {
    setSelectFieldOptions(
      selectFieldOptions.filter(option => option !== optionToRemove)
    )
  }

  const updateCheckbox = e => setCheckboxChecked(e.target.checked)

  const updateFile = e => {
    const currentFile = e.target.files[0]

    if (currentFile) {
      const reader = new FileReader()
      
      reader.onloadend = () => {
        if (file && file.state) {
          file.state(prev => ({ ...prev, [rest.name]: reader.result }))
        }
      }
      
      reader.readAsDataURL(currentFile)
    }
  }

  /**
   * COMPONENT PROPS & COMPONENT
   */
  const element = (textarea && "textarea") || (select && "select") || "input"

  const fileButton = useRef(null)
  const enableFileButtonClick = e => {
    if (e.code === "Space" || e.key === "Enter") {
      e.preventDefault()
      fileButton.current.click()
    }
  }

  return (
    <div className="w-full">
      <label
        htmlFor={rest.name}
        {...file && {
          tabIndex: 0,
          role: "button",
          "aria-haspopup": "dialog",
          onKeyDown: enableFileButtonClick
        }}
        className={classNames(
        {
          "leading-loose": !file,
          "block bg-accent rounded-shape cursor-pointer text-light text-center px-2 py-1": file
        }
      )}>
        {label || capitalizeString(rest.name)}
      </label>
      <div className={classNames(
        "relative",
        {
          "text-danger": errors[rest.name],
          "inline ml-4": checkbox,
          "hidden": file
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
              ...textarea && {
                cols: 10,
                rows: 2
              },
              ...element === "input" && {
                type: checkbox && "checkbox" || file && "file" || rest.type || "text",
                ...rest.type === "number" && {
                  min: 0
                },
                ...checkbox && {
                  checked: checkboxChecked,
                  onChange: updateCheckbox
                },
                ...file && {
                  accept: file.accept,
                  ref: fileButton,
                  ...file.state && { onChange: updateFile }
                }
              },
              ...(select && select.options) && {
                ...select.multiple ? {
                  value: selectFieldOptions,
                  multiple: true,
                  size: 3
                } : {
                  value: selectFieldOption
                },
                onChange: updateSelectFieldOptions
              },
              ...rest.required && { required: true, "aria-required": true },
              ...errors[rest.name] && { invalid: "true", "aria-invalid": "true", "aria-describedby": `${rest.name}-hint` },
              ...!(select || checkbox || file) && {
                onBlur: e => {
                  validateField(e)
                  clearLength()
                },
                onChange: e => {
                  updateIsEmpty(e)
                  updateLength(e)
                  clearFieldError(e)
                }
              },
              ...(rest.type === "number" || select) && {
                style: {
                  WebkitAppearance: "none",
                  MozAppearance: select ? "none" : "textfield"
                }
              },
              ...!checkbox && {
                className: classNames(
                  "border-2 focus-visible:border-current focus-visible:outline-none rounded-shape w-full",
                  {
                    "bg-light": lightMode,
                    "bg-dark": !lightMode,
                    "border-medium-light": lightMode && !errors[rest.name],
                    "border-medium-dark": !lightMode && !errors[rest.name],
                    "border-current": errors[rest.name],
                    "appearance-none": rest.type === "number" && select,
                    "resize-none": textarea,
                    "px-2 py-1": !(select && select.multiple),
                    "pr-8": copy,
                    "pl-6": rest.name === "username",
                    "hidden": select && (select.multiple && select.maxOptions === selectFieldOptions.length)
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
                      "hidden": (select.multiple && selectFieldOptions.includes(option))
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
          select && (
            <>
              {
                !select.multiple && (
                  <FaChevronDown className="absolute top-2.5 right-2" />
                )
              }
              {
                ((select.options && select.multiple) && selectFieldOptions.length > 0) && (
                  <>
                    {
                      (rest.name === "pronouns" && nameIsEmpty) && (
                        <span className="block text-warning font-semibold">
                          Name is empty, so the pronouns will not be shown on profile.
                        </span>
                      )
                    }
                    {
                      (select.maxOptions && select.maxOptions === selectFieldOptions.length) && (
                        <span className="block text-warning font-semibold">
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
