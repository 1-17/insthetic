import { useState } from "react"
import { FormContext } from "."
import { capitalizeString } from "../utils"
import { Validations, regex } from "../models"

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

  const handleSubmit = (e, /*form*/updateData) => {
    e.preventDefault()

    const formData = [...e.target.elements].reduce((acc, element) => {
      let value

      if (regex.numbersOnly.test(element.value)) {
        value = Number(element.value)
      }

      else if (element.tagName === "SELECT" && element.multiple) {
        value = [...element.selectedOptions].map(element => element.value)
      }

      else {
        value = element.value
      }

      if (element.name && !["checkbox", "file"].includes(element.type)) {
        acc[element.name] = value
      }
    
      return acc
    }, {})
    
    const isSubmitted = (boolean) => {
      setSubmitted(boolean)
      setTimeout(() => setSubmitted(initialState.submitted), 1500)
    }

    if (submitted === initialState.submitted) {
      if (hasErrors()) {
        return isSubmitted(false)
      }

      // form.state(prev => {
      //   if (form.key) {
      //     return {
      //       ...prev,
      //       [form.key]: [
      //         ...prev[form.key],
      //         Object.fromEntries(Object.entries(formData))
      //       ]
      //     }
      //   }

      //   return {
      //     ...prev,
      //     ...Object.fromEntries(Object.entries(formData))
      //   }
      // })

      updateData(prev => ({
        ...prev,
        ...Object.fromEntries(Object.entries(formData))
      }))
      
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
