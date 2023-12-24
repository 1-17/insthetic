import { useEffect, useState } from "react"

const handleTheme = () => {
  const dbKey = "light_mode"
  const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches

  const [lightMode, setLightMode] = useState(
    JSON.parse(localStorage.getItem(dbKey)) || isLightMode
  )

  useEffect(() => {
    localStorage.setItem(dbKey, JSON.stringify(lightMode))
  }, [lightMode])

  const changeTheme = () => setLightMode(prev => !prev)

  return { lightMode, changeTheme }
}

export default handleTheme
