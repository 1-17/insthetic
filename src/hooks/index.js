import { useContext } from "react"
import { ThemeContext, ScreenContext, UserContext } from "../contexts"

export const useTheme = () => useContext(ThemeContext)
export const useScreen = () => useContext(ScreenContext)
export const useUser = () => useContext(UserContext)
