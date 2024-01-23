import { useState } from "react"
import { FormContext } from "."
import { capitalizeString } from "../utils"
import UserValidations from "../models/UserValidations"

const FormProvider = ({ children }) => {
  const userValidations = new UserValidations()
  const initialErrorsState = {}

  for (let field in userValidations) {
    initialErrorsState[field] = null
  }
  
  const [errors, setErrors] = useState(initialErrorsState)
  const [formUpdated, setFormUpdated] = useState(null)
  
  const handleUserValidations = e => {
    const { name, value } = e.target
    
    if (e.type === "blur" && userValidations[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: userValidations[name](capitalizeString(name), value)
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

    const data = new FormData(e.target)

    if (formUpdated === null) {
      if (hasErrors) {
        setFormUpdated(false)
        return setTimeout(() => setFormUpdated(null), 1500)
      }

      data.forEach((value, field) => newData(prev => ({ ...prev, [field]: value })))
      setFormUpdated(true)
      setTimeout(() => setFormUpdated(null), 1500)
    }
  }

  const clearErrors = () => hasErrors && setErrors(initialErrorsState)

  return (
    <FormContext.Provider value={{ errors, handleUserValidations, clearErrors, handleSubmit, formUpdated }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
