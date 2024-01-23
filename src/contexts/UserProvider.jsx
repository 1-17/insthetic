import { useEffect, useState } from "react"
import { UserContext } from "."
import InitialUser from "../models/InitialUser"

const UserProvider = ({ children }) => {
  const dbKey = "user"
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(dbKey)) || new InitialUser())

  useEffect(() => {
    localStorage.setItem(dbKey, JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
