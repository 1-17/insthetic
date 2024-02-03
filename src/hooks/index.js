import { useContext } from "react"
import { ThemeContext, ComponentContext, UserContext } from "../contexts"

export const useTheme = () => useContext(ThemeContext)
export const useComponent = () => useContext(ComponentContext)
export const useUser = () => useContext(UserContext)
