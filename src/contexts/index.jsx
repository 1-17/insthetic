import { createContext } from "react"
import ThemeProvider from "./ThemeProvider"
import FormProvider from "./FormProvider"
import UserProvider from "./UserProvider"
import ComponentProvider from "./ComponentProvider"

export const ThemeContext = createContext()
export const FormContext = createContext()
export const UserContext = createContext()
export const ComponentContext = createContext()

const Contexts = ({ children }) => {
  return (
    <ThemeProvider>
      <FormProvider>
        <UserProvider>
          <ComponentProvider>
            {children}
          </ComponentProvider>
        </UserProvider>
      </FormProvider>
    </ThemeProvider>
  )
}

export default Contexts
