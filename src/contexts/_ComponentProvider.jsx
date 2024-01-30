import { useState } from "react"
import { ComponentContext } from "."
import { useForm } from "../hooks"

const ComponentProvider = ({ children }) => {
  const { clearFormStates } = useForm()
  
  const [component, setComponent] = useState({ profile: true, profileConfig: false, addMedia: false })

  const showComponent = key => {
    if (!component[key]) {
      setComponent(prev => ({
        ...Object.fromEntries(Object.keys(prev).map(k => [k, k === key])),
        [key]: true
      }))
      
      clearFormStates()
    }
  }

  const showProfile = () => showComponent("profile")
  const showProfileConfig = () => showComponent("profileConfig")
  const showAddMedia = () => showComponent("addMedia")

  return (
    <ComponentContext.Provider value={{
      profile: component.profile, showProfile,
      profileConfig: component.profileConfig, showProfileConfig,
      addMedia: component.addMedia, showAddMedia
    }}>
      {children}
    </ComponentContext.Provider>
  ) 
}

export default ComponentProvider
