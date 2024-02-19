import { useEffect, useRef, useState } from "react"
import { UserContext } from "."
import { usePopup, useScreen } from "../hooks"
import { InitialUser } from "../models"
import DefaultImage from "../assets/images/default-image.svg"

const UserProvider = ({ children }) => {
  const { openBasicPopup } = usePopup()
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
        openBasicPopup({
          title: "Error",
          description: "App storage is full. Please, delete some highlights or posts and try again."
        })
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
      return openBasicPopup({
        title: "Avatar",
        description: "Are you sure you want to remove the current avatar photo? This action cannot be undone.",
        ok: () => {
          setUser(prev => ({ ...prev, avatar: initialUser.avatar }))

          openBasicPopup({
            title: "Success",
            description: "Avatar removed."
          })
        }
      })
    }

    openBasicPopup({
      title: "Warning",
      description: "There is no photo to remove."
    })
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
        {
          id: !user.highlights.length ? 1 : Math.max(...user.highlights.map(highlight => highlight.id)) + 1,
          ...newHighlight
        },
        ...prev.highlights
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
    openBasicPopup({
      title: "Delete highlight",
      description: "Are you sure you want to remove this highlight? This action cannot be undone.",
      ok: () => {
        setUser(prev => ({
          ...prev,
          highlights: prev.highlights.filter(highlight => highlight.id !== currentHighlight.id)
        }))

        setCurrentHighlight(initialState.currentMedia)
        showProfile()

        openBasicPopup({
          title: "Success",
          description: "Highlight removed."
        })
      }
    })
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
    openBasicPopup({
      title: "Delete post",
      description: "Are you sure you want to remove this post? This action cannot be undone.",
      ok: () => {
        setUser(prev => ({
          ...prev,
          posts: prev.posts.filter(post => post.id !== selectedPostId)
        }))

        openBasicPopup({
          title: "Success",
          description: "Post deleted."
        })
      }
    })
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
