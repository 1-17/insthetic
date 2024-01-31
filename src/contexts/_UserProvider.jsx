import { useEffect, useState } from "react"
import { UserContext } from "."
import { InitialUser, regex } from "../models"
import DefaultImage from "../assets/images/default-image.svg"

const UserProvider = ({ children }) => {
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

  const removeAvatar = () => {
    if (user.avatar) {
      return setUser(prev => ({ ...prev, avatar: null }))
    }

    alert("There's no photo to remove.")
  }

  const updateUser = e => {
    const formData = [...e.target.elements].reduce((acc, element) => {
      let value

      if (regex.numbersOnly.test(element.value)) {
        value = Number(element.value)
      }

      else if (element.tagName === "SELECT" && element.multiple) {
        value = [...element.selectedOptions].map(element => element.value)
      }

      else {
        value = element.value
      }

      if (element.name && !["checkbox", "file"].includes(element.type)) {
        acc[element.name] = value
      }
    
      return acc
    }, {})

    setUser(prev => ({
      ...prev,
      ...Object.fromEntries(Object.entries(formData))
    }))
  }

  const discardChanges = () => setUser(prev => prev)

  const addHighlight = () => {
    setUser(prev => ({
      ...prev,
      highlights: [
        ...prev.highlights,
        newHighlight
      ]
    }))

    setNewHighlight(initialState.newHighlight)
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      newHighlight,
      setNewHighlight,
      addHighlight,
      updateUser,
      removeAvatar,
      discardChanges
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
