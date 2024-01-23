import { createContext } from "react"
import ThemeProvider from "./ThemeProvider"
import FormProvider from "./FormProvider"
import ComponentProvider from "./ComponentProvider"
import UserProvider from "./UserProvider"

export const ThemeContext = createContext()
export const FormContext = createContext()
export const ComponentContext = createContext()
export const UserContext = createContext()

const Contexts = ({ children }) => {
  return (
    <ThemeProvider>
      <FormProvider>
        <ComponentProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ComponentProvider>
      </FormProvider>
    </ThemeProvider>
  )
}

export default Contexts
