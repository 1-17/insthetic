import { useState } from "react"
import { FormContext } from "."
import { capitalizeString } from "../utils"
import { Validations } from "../models"

const FormProvider = ({ children }) => {
  const initialState = { errors: {}, submitted: null }
  const [errors, setErrors] = useState(initialState.errors)
  const [submitted, setSubmitted] = useState(initialState.submitted)
  
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
        ...prev !== prev[name] && prev
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
    
    const isSubmitted = (boolean) => {
      setSubmitted(boolean)
      setTimeout(() => setSubmitted(initialState.submitted), 1500)
    }

    if (submitted === initialState.submitted) {
      if (hasErrors()) {
        return isSubmitted(false)
      }

      updateData(e)
      isSubmitted(true)
    }
  }

  const clearFormStates = () => {
    if (hasErrors()) {
      setErrors(initialState.errors)
    }
    
    if (submitted !== initialState.submitted) {
      setSubmitted(initialState.submitted)
    }
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
