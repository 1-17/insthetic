import { createContext } from "react"
import handleTheme from "../utils/handleTheme"
import handleUser from "../utils/handleUser"
import handleComponent from "../utils/handleComponent"

export const ThemeContext = createContext()
export const UserContext = createContext()
export const ComponentContext = createContext()

const Contexts = ({ children }) => {
  return (
    <ThemeContext.Provider value={handleTheme()}>
      <UserContext.Provider value={handleUser()}>
        <ComponentContext.Provider value={handleComponent()}>
          {children}
        </ComponentContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default Contexts
