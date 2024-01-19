import { useState } from "react"
import { ComponentContext } from "."

const ComponentProvider = ({ children }) => {
  const [profile, setProfile] = useState(true)
  const [config, setConfig] = useState(false)

  const changeComponent = () => {
    setProfile(prev => !prev)
    setConfig(prev => !prev)
  }

  return (
    <ComponentContext.Provider value={{ profile, config, changeComponent }}>
      {children}
    </ComponentContext.Provider>
  ) 
}

export default ComponentProvider
