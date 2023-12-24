import { useEffect, useState } from "react"
import User from "../models/User"

const handleUser = () => {
  const dbKey = "user"
  const userData = new User()

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(dbKey)) || userData
  )

  useEffect(() => {
    localStorage.setItem(dbKey, JSON.stringify(user))
  }, [user])

  const updateUser = data => setUser(data)

  return { user, updateUser }
}

export default handleUser
