import { useContext } from "react"
import { ThemeContext, ScreenContext, PopupContext, UserContext } from "../contexts"

export const useTheme = () => useContext(ThemeContext)
export const useScreen = () => useContext(ScreenContext)
export const usePopup = () => useContext(PopupContext)
export const useUser = () => useContext(UserContext)
