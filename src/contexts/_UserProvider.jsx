import { useEffect, useRef, useState } from "react"
import { UserContext } from "."
import { useScreen } from "../hooks"
import { InitialUser } from "../models"
import DefaultImage from "../assets/images/default-image.svg"

const UserProvider = ({ children }) => {
  const { addMedia, highlight, showProfile, showHighlight } = useScreen()

  const initialUser = new InitialUser()
  const dbKey = "user"
  const postsRef = useRef([])

  const initialState = {
    user: JSON.parse(localStorage.getItem(dbKey)) || initialUser,
    newHighlight: { cover: DefaultImage, description: "Highlights" },
    newPost: { image: DefaultImage },
    currentMedia: null
  }
  
  const [user, setUser] = useState(initialState.user)
  const [newHighlight, setNewHighlight] = useState(initialState.newHighlight)
  const [currentHighlight, setCurrentHighlight] = useState(initialState.currentMedia)
  const [newPost, setNewPost] = useState(initialState.newPost)
  const [selectedPostId, setSelectedPostId] = useState(initialState.currentMedia)

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
    currentHighlight !== initialState.currentMedia && showHighlight()
  }, [currentHighlight])

  useEffect(() => {
    !addMedia && setNewHighlight(initialState.newHighlight), setNewPost(initialState.newPost)
    !highlight && setCurrentHighlight(initialState.currentMedia)
  }, [addMedia, highlight])

  useEffect(() => {
    const clearCurrentPost = e => {
      const notPostElement = !postsRef.current.some(ref => ref && ref.contains(e.target))
      notPostElement && setSelectedPostId(initialState.currentMedia)
    }

    window.addEventListener("click", clearCurrentPost)
    return () => window.removeEventListener("click", clearCurrentPost)
  }, [])

  const removeAvatar = () => {
    if (user.avatar) {
      return setUser(prev => ({ ...prev, avatar: initialUser.avatar }))
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
      setCurrentHighlight(initialState.currentMedia)
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

    setCurrentHighlight(initialState.currentMedia)
    showProfile()
  }

  const addPost = () => {
    setUser(prev => ({
      ...prev,
      posts: [
        {
          id: !user.posts.length ? 1 : Math.max(...user.posts.map(post => post.id)) + 1,
          ...newPost
        },
        ...prev.posts
      ]
    }))

    setTimeout(() => {
      setNewPost(initialState.newPost)
    }, 1500)
  }

  const handleSelectedPostId = e => {
    const postId = Number(e.currentTarget.id)
    
    setSelectedPostId(selectedPostId !== postId ? postId : initialState.currentMedia)
  }

  const deletePost = () => {
    if (confirm("Are you sure you want to remove this post? This action cannot be undone.")) {
      setUser(prev => ({
        ...prev,
        posts: prev.posts.filter(post => post.id !== selectedPostId)
      }))
    }
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
      postsRef,
      newPost,
      setNewPost,
      addPost,
      selectedPostId,
      handleSelectedPostId,
      deletePost,
      removeAvatar
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
