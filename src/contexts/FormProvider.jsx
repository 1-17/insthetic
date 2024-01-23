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
    
    if (userValidations[name]) {
      return setErrors(prev => ({
        ...prev,
        [name]: userValidations[name](capitalizeString(name), value)
      }))
    }
  }

  const clearErrors = () => setErrors(initialErrorsState)
  
  const handleSubmit = (e, newData) => {
    e.preventDefault()

    const data = new FormData(e.target)

    if (formUpdated === null) {
      for (let field in errors) {
        if (errors[field]) {
          setFormUpdated(false)
          return setTimeout(() => setFormUpdated(null), 1500)
        }
      }

      data.forEach((value, field) => newData(prev => ({ ...prev, [field]: value })))
      setFormUpdated(true)
      setTimeout(() => setFormUpdated(null), 1500)
    }
  }

  return (
    <FormContext.Provider value={{ errors, handleUserValidations, clearErrors, handleSubmit, formUpdated }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
