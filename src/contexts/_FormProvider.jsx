import { useState } from "react"
import { FormContext } from "."
import { capitalizeString } from "../utils"
import { Validations } from "../models"

const FormProvider = ({ children }) => {
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  
  const validations = new Validations()

  const validateField = e => {
    const { name, value } = e.target
    
    if (validations[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validations[name](capitalizeString(name), value)
      }))
    }
  }

  const clearFieldError = e => {
    const { name } = e.target
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const hasErrors = () => {
    for (let field in errors) {
      if (errors[field]) {
        return true
      }
    }

    return false
  }
  
  const handleSubmit = (e, updateData) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formDataEntries = [...formData.entries()]

    const isSubmitted = (boolean) => {
      setSubmitted(boolean)
      setTimeout(() => setSubmitted(null), 1500)
    }

    if (submitted === null) {
      if (hasErrors()) {
        return isSubmitted(false)
      }

      formData.forEach((value, field) => {
        updateData(prev => ({
          ...prev,
          pronouns: formDataEntries.filter(entry => entry[0] === "pronouns").map(entry => entry[1]),
          [field]: value
        }))
      })
      isSubmitted(true)
    }
  }

  const clearFormStates = () => {
    hasErrors() && setErrors({})
    submitted !== null && setSubmitted(null)
  }

  return (
    <FormContext.Provider value={{
      errors,
      submitted,
      validateField,
      clearFieldError,
      handleSubmit,
      clearFormStates
    }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
