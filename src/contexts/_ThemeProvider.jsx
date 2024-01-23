import { useEffect, useState } from "react"
import { ThemeContext } from "."

const ThemeProvider = ({ children }) => {
  const dbKey = "light_mode"
  const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches

  const [lightMode, setLightMode] = useState(JSON.parse(localStorage.getItem(dbKey)))

  useEffect(() => {
    lightMode === null && setLightMode(isLightMode)
    localStorage.setItem(dbKey, JSON.stringify(lightMode))
  }, [lightMode])

  const changeTheme = () => setLightMode(prev => !prev)

  return (
    <ThemeContext.Provider value={{ lightMode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
