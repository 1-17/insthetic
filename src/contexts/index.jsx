import { createContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import ThemeProvider from "./_ThemeProvider"
import ComponentProvider from "./_ComponentProvider"
import UserProvider from "./_UserProvider"

export const ThemeContext = createContext()
export const ComponentContext = createContext()
export const UserContext = createContext()

const Contexts = ({ children }) => {
  const formMethods = useForm()

  return (
    <ThemeProvider>
      <FormProvider {...formMethods}>
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
