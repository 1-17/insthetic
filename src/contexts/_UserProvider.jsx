import { useEffect, useState } from "react"
import { UserContext } from "."
import { useScreen } from "../hooks"
import { InitialUser } from "../models"
import DefaultImage from "../assets/images/default-image.svg"

const UserProvider = ({ children }) => {
  const { addMedia, highlight, showProfile } = useScreen()

  const dbKey = "user"

  const initialState = {
    user: JSON.parse(localStorage.getItem(dbKey)) || new InitialUser(),
    newHighlight: { cover: DefaultImage, description: "Highlights" },
    currentHighlight: null
  }
  
  const [user, setUser] = useState(initialState.user)
  const [newHighlight, setNewHighlight] = useState(initialState.newHighlight)
  const [currentHighlight, setCurrentHighlight] = useState(initialState.currentHighlight)
  
  useEffect(() => {
    try {
      localStorage.setItem(dbKey, JSON.stringify(user))
    } catch (err) {
      if (err instanceof DOMException && err.name === "QuotaExceededError") {
        alert("Browser storage is full. Please, clear it and try again.")
      }
    }
  }, [user])

  useEffect(() => {
    !addMedia && setNewHighlight(initialState.newHighlight)
    !highlight && setCurrentHighlight(initialState.currentHighlight)
  }, [addMedia, highlight])

  const removeAvatar = () => {
    if (user.avatar) {
      return setUser(prev => ({ ...prev, avatar: null }))
    }

    alert("There's no photo to remove.")
  }

  const updateUser = data => {
    const formData = Object.fromEntries(Object.entries(data)
      .filter(([key, value]) => value !== undefined && [key, value])
      .map(([key, value]) => {
        if (["followers", "following"].includes(key)) {
          return [key, Number(value)]
        }
        
        return [key, value]
      })
    )
    
    setUser(prev => ({ ...prev, ...formData }))
  }

  const addHighlight = () => {
    setUser(prev => ({
      ...prev,
      highlights: [
        ...prev.highlights,
        {
          id: !user.highlights.length ? 1 : Math.max(...user.highlights.map(highlight => highlight.id)) + 1,
          ...newHighlight
        }
      ]
    }))

    setTimeout(() => {
      setNewHighlight(initialState.newHighlight)
    }, 1500)
  }

  const editHighlight = () => {
    setUser(prev => ({
      ...prev,
      highlights: prev.highlights.map(highlight => highlight.id === currentHighlight.id ? currentHighlight : highlight)
    }))

    setTimeout(() => {
      setCurrentHighlight(initialState.currentHighlight)
      showProfile()
    }, 1500)
  }

  const deleteHighlight = () => {
    if (confirm("Are you sure you want to remove this highlight? This action cannot be undone.")) {
      setUser(prev => ({
        ...prev,
        highlights: prev.highlights.filter(highlight => highlight.id !== currentHighlight.id)
      }))
    }

    setCurrentHighlight(initialState.currentHighlight)
    showProfile()
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      updateUser,
      newHighlight,
      setNewHighlight,
      addHighlight,
      currentHighlight,
      setCurrentHighlight,
      editHighlight,
      deleteHighlight,
      removeAvatar
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
