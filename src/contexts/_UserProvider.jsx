import { useEffect, useState } from "react"
import { UserContext } from "."
import { InitialUser } from "../models"

const UserProvider = ({ children }) => {
  const dbKey = "user"
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(dbKey)) || new InitialUser())

  useEffect(() => {
    localStorage.setItem(dbKey, JSON.stringify(user))
  }, [user])

  const removeAvatar = () => {
    if (user.avatar) {
      return setUser(prev => ({ ...prev, avatar: null }))
    }

    alert("There's no photo to remove.")
  }

  const discardChanges = () => setUser(prev => prev)

  return (
    <UserContext.Provider value={{ user, setUser, removeAvatar, discardChanges }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
