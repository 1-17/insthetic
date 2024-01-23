import { useContext } from "react"
import { ThemeContext, ComponentContext, FormContext, UserContext } from "../contexts"

export const useTheme = () => useContext(ThemeContext)
export const useComponent = () => useContext(ComponentContext)
export const useForm = () => useContext(FormContext)
export const useUser = () => useContext(UserContext)
