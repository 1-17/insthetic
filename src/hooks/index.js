import { useContext } from "react"
import { ComponentContext, ThemeContext, UserContext } from "../contexts"

export const useTheme = () => useContext(ThemeContext)
export const useUser = () => useContext(UserContext)
export const useComponent = () => useContext(ComponentContext)
