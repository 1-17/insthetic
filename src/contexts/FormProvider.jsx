import { useState } from "react"
import { FormContext } from "."
import Validations from "../models/Validations"

const FormProvider = ({ children }) => {
  const validations = new Validations()
  const initialState = {}

  for (let field in validations) {
    initialState[field] = ""
  }
  
  const [errors, setErrors] = useState(initialState)

  const handleValidations = e => {
    const { name, value } = e.target
    
    if (validations[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validations[name](value)
      }))
    }

    throw new Error("Field name or field validation function does not exist on validations.")
  }

  const handleIsValid = () => {
    for (let field in errors) {
      if (!errors[field]) {
        return false
      }
    }

    return true
  }

  return (
    <FormContext.Provider value={{ errors, handleValidations, handleIsValid }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
