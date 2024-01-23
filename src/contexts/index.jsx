import { createContext } from "react"
import ThemeProvider from "./_ThemeProvider"
import FormProvider from "./_FormProvider"
import ComponentProvider from "./_ComponentProvider"
import UserProvider from "./_UserProvider"

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
