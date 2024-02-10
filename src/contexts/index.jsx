import { createContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import ThemeProvider from "./_ThemeProvider"
import ScreenProvider from "./_ScreenProvider"
import UserProvider from "./_UserProvider"

export const ThemeContext = createContext()
export const ScreenContext = createContext()
export const UserContext = createContext()

const Contexts = ({ children }) => {
  const formMethods = useForm()

  return (
    <ThemeProvider>
      <FormProvider {...formMethods}>
        <ScreenProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ScreenProvider>
      </FormProvider>
    </ThemeProvider>
  )
}

export default Contexts
