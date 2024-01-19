import { useEffect, useState } from "react"
import { UserContext } from "."
import User from "../models/User"

const UserProvider = ({ children }) => {
  const dbKey = "user"
  const userData = new User()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem(dbKey)) || userData)

  useEffect(() => {
    localStorage.setItem(dbKey, JSON.stringify(user))
  }, [user])

  const updateUser = e => {
    e.preventDefault()
    console.log("works")
    // setUser(prev => ({ ...prev, [name]: value }))
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
