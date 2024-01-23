import { useContext } from "react"
import { ThemeContext, FormContext, ComponentContext, UserContext } from "../contexts"

export const useTheme = () => useContext(ThemeContext)
export const useForm = () => useContext(FormContext)
export const useComponent = () => useContext(ComponentContext)
export const useUser = () => useContext(UserContext)
