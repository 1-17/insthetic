import { useState } from "react"
import { FormContext } from "."
import { capitalizeString } from "../utils"
import { Validations } from "../models"

const FormProvider = ({ children }) => {
  const [errors, setErrors] = useState({})
  const [formUpdated, setFormUpdated] = useState(null)
  
  const validations = new Validations()

  const handleValidations = e => {
    const { name, value } = e.target
    
    if (e.type === "blur" && validations[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validations[name](capitalizeString(name), value)
      }))
    }

    if (e.type === "change") {
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
  
  const handleSubmit = (e, newData) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    if (formUpdated === null) {
      if (hasErrors()) {
        setFormUpdated(false)
        return setTimeout(() => setFormUpdated(null), 1500)
      }

      formData.forEach((value, field) => newData(prev => ({ ...prev, [field]: value })))
      setFormUpdated(true)
      setTimeout(() => setFormUpdated(null), 1500)
    }
  }

  const clearErrors = () => hasErrors() && setErrors({})
  const clearFormUpdated = () => formUpdated !== null && setFormUpdated(null)

  return (
    <FormContext.Provider value={{
      errors,
      formUpdated,
      handleValidations,
      handleSubmit,
      clearErrors,
      clearFormUpdated
    }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
