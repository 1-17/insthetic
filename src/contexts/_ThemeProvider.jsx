import { useEffect, useState } from "react"
import { ThemeContext } from "."

const ThemeProvider = ({ children }) => {
  const dbKey = "light_mode"
  const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches

  const [lightMode, setLightMode] = useState(() => {
    const dbTheme = localStorage.getItem(dbKey)
    return dbTheme !== null ? JSON.parse(dbTheme) : isLightMode
  })

  useEffect(() => {
    localStorage.setItem(dbKey, JSON.stringify(lightMode))

    const toggleDarkClass = () => {
      const element = document.body
      const className = "dark"

      if (!lightMode) {
        return element.classList.add(className)
      }

      element.classList.remove(className)

      if (!element.classList.length) {
        element.removeAttribute("class")
      }
    }

    toggleDarkClass()

    return toggleDarkClass
  }, [lightMode])

  const changeTheme = () => setLightMode(prev => !prev)

  return (
    <ThemeContext.Provider value={{ lightMode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
