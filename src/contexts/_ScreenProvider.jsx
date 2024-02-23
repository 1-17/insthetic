import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ScreenContext } from "."
import { formatString } from "../utils"
import { Profile, ProfileConfig } from "../screens"

const ScreenProvider = ({ children }) => {
  const { reset } = useFormContext()

  const initialState = {
    profile: {
      visible: true,
      component: Profile
    },
    profileConfig: {
      visible: false,
      component: ProfileConfig
    }
  }

  const [screen, setScreen] = useState(initialState)

  useEffect(() => {
    reset()
  }, [screen])

  const showScreen = screenName => {
    const updatedScreen = {}

    for (const key in screen) {
      updatedScreen[key] = {
        ...screen[key],
        visible: key === screenName
      }
    }

    setScreen(updatedScreen)
  }

  const keysAndMethods = Object.keys(screen).reduce((acc, key) => {
    acc[key] = screen[key].visible
    acc[`show${formatString.capitalize(key)}`] = () => showScreen(key)
    return acc
  }, {})

  const ScreenComponent = Object.values(screen).find(screen => screen.visible).component

  const screenTitle = formatString.splitAndCapitalizeCamelCase(Object.entries(screen).find(([_key, value]) => value.visible)[0])

  return (
    <ScreenContext.Provider value={{ ...keysAndMethods, ScreenComponent, screenTitle }}>
      {children}
    </ScreenContext.Provider>
  )
}

export default ScreenProvider
