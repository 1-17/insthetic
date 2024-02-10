import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ScreenContext } from "."

const ScreenProvider = ({ children }) => {
  const { reset } = useFormContext()

  const [screen, setScreen] = useState({ profile: true, profileConfig: false, addMedia: false })

  useEffect(() => {
    reset()
  }, [screen])

  const showScreen = key => {
    if (!screen[key]) {
      setScreen(prev => ({
        ...Object.fromEntries(Object.keys(prev).map(k => [k, k === key])),
        [key]: true
      }))
    }
  }

  const showProfile = () => showScreen("profile")
  const showProfileConfig = () => showScreen("profileConfig")
  const showAddMedia = () => showScreen("addMedia")

  return (
    <ScreenContext.Provider value={{
      profile: screen.profile, showProfile,
      profileConfig: screen.profileConfig, showProfileConfig,
      addMedia: screen.addMedia, showAddMedia
    }}>
      {children}
    </ScreenContext.Provider>
  ) 
}

export default ScreenProvider
