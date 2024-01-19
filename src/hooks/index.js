import { useContext } from "react"
import { ThemeContext, FormContext, UserContext, ComponentContext } from "../contexts"

export const useTheme = () => useContext(ThemeContext)
export const useForm = () => useContext(FormContext)
export const useUser = () => useContext(UserContext)
export const useComponent = () => useContext(ComponentContext)
