import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ScreenContext } from "."
import { capitalizeString } from "../utils"
import { Profile, ProfileConfig, AddMedia, Highlight } from "../screens"

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
    },
    addMedia: {
      visible: false,
      component: AddMedia
    },
    highlight: {
      visible: false,
      component: Highlight
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
    acc[`show${capitalizeString(key)}`] = () => showScreen(key)
    return acc
  }, {})

  const ScreenComponent = Object.values(screen).find(screen => screen.visible).component

  return (
    <ScreenContext.Provider value={{ ...keysAndMethods, ScreenComponent }}>
      {children}
    </ScreenContext.Provider>
  )
}

export default ScreenProvider
