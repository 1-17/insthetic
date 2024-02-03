import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ComponentContext } from "."

const ComponentProvider = ({ children }) => {
  const { reset } = useFormContext()

  const [component, setComponent] = useState({ profile: true, profileConfig: false, addMedia: false })

  useEffect(() => {
    reset()
  }, [component])

  const showComponent = key => {
    if (!component[key]) {
      setComponent(prev => ({
        ...Object.fromEntries(Object.keys(prev).map(k => [k, k === key])),
        [key]: true
      }))
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
