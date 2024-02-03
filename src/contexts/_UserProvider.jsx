import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { UserContext } from "."
import { useComponent } from "../hooks"
import { InitialUser } from "../models"
import DefaultImage from "../assets/images/default-image.svg"

const UserProvider = ({ children }) => {
  const { setError, clearErrors } = useFormContext()
  const { addMedia } = useComponent()

  const dbKey = "user"

  const initialState = {
    user: JSON.parse(localStorage.getItem(dbKey)) || new InitialUser(),
    newHighlight: { image: DefaultImage, description: "Highlights" }
  }
  
  const [user, setUser] = useState(initialState.user)
  const [newHighlight, setNewHighlight] = useState(initialState.newHighlight)

  useEffect(() => {
    localStorage.setItem(dbKey, JSON.stringify(user))
  }, [user])

  useEffect(() => {
    if (!addMedia) {
      setNewHighlight(initialState.newHighlight)
    }
  }, [addMedia])

  useEffect(() => {
    if (newHighlight.image !== initialState.newHighlight.image) {
      clearErrors("image")
    }
  }, [newHighlight])

  const removeAvatar = () => {
    if (user.avatar) {
      return setUser(prev => ({ ...prev, avatar: null }))
    }

    alert("There's no photo to remove.")
  }

  const updateUser = data => {
    const formData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined && [key, value]))
    
    setUser(prev => ({ ...prev, ...formData }))
  }

  const addHighlight = () => {
    if (newHighlight.image === initialState.newHighlight.image) {
      return setError("image", { type: "required", message: "Highlight cover is required." })
    }

    setUser(prev => ({
      ...prev,
      highlights: [
        ...prev.highlights,
        newHighlight
      ]
    }))

    setTimeout(() => {
      setNewHighlight(initialState.newHighlight)
    }, 1500)
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      newHighlight,
      setNewHighlight,
      addHighlight,
      updateUser,
      removeAvatar
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
