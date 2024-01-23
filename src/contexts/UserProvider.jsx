import { useEffect, useState } from "react"
import { UserContext } from "."
import { useForm } from "../hooks"
import InitialUser from "../models/InitialUser"

const UserProvider = ({ children }) => {
  const dbKey = "user"
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(dbKey)) || new InitialUser())
  const { handleSubmit } = useForm()

  useEffect(() => {
    localStorage.setItem(dbKey, JSON.stringify(user))
  }, [user])

  const updateUser = e => handleSubmit(e, setUser)

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
