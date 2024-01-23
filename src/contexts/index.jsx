import { createContext } from "react"
import ThemeProvider from "./ThemeProvider"
import ComponentProvider from "./ComponentProvider"
import FormProvider from "./FormProvider"
import UserProvider from "./UserProvider"

export const ThemeContext = createContext()
export const ComponentContext = createContext()
export const FormContext = createContext()
export const UserContext = createContext()

const Contexts = ({ children }) => {
  return (
    <ThemeProvider>
      <ComponentProvider>
        <FormProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </FormProvider>
      </ComponentProvider>
    </ThemeProvider>
  )
}

export default Contexts
