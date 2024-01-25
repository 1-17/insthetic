import { useState } from "react"
import { ComponentContext } from "."
import { useForm } from "../hooks"

const ComponentProvider = ({ children }) => {
  const { clearFormStates } = useForm()
  
  const [profile, setProfile] = useState(true)
  const [config, setConfig] = useState(false)

  const changeComponent = () => {
    setProfile(prev => !prev)
    setConfig(prev => !prev)
    clearFormStates()
  }

  return (
    <ComponentContext.Provider value={{ profile, config, changeComponent }}>
      {children}
    </ComponentContext.Provider>
  ) 
}

export default ComponentProvider
