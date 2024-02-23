import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { UserContext } from "."
import { usePopup } from "../hooks"
import { readImage } from "../utils"
import { InitialUser } from "../models"
import { EditHighlight } from "../components/popup"
import DefaultImage from "../assets/images/default-image.svg"

const UserProvider = ({ children }) => {
  const { reset, setValue, clearErrors } = useFormContext()
  const { isOpen, openBasicPopup, openComponentPopup } = usePopup()

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
  const [selectedHighlight, setSelectedHighlight] = useState(initialState.currentMedia)
  const [newPost, setNewPost] = useState(initialState.newPost)
  const [selectedPostId, setSelectedPostId] = useState(initialState.currentMedia)

  useEffect(() => {
    try {
      localStorage.setItem(dbKey, JSON.stringify(user))
    } catch (err) {
      if (err instanceof DOMException && err.name === "QuotaExceededError") {
        openBasicPopup({
          title: "Error",
          description: "App storage is full. Please, delete some posts or highlights and try again."
        })
      }
    }
  }, [user])

  useEffect(() => {
    if (!isOpen) {
      setNewHighlight(initialState.newHighlight)
      setNewPost(initialState.newPost)
      setSelectedHighlight(initialState.currentMedia)
      reset()
    }
  }, [isOpen])

  useEffect(() => {
    const clearCurrentPost = e => {
      const notPostElementClicked = !postsRef.current.some(ref => ref && ref.contains(e.target))
      notPostElementClicked && setSelectedPostId(initialState.currentMedia)
    }

    window.addEventListener("click", clearCurrentPost)
    return () => window.removeEventListener("click", clearCurrentPost)
  }, [])

  const removeAvatar = () => {
    if (user.avatar) {
      return openBasicPopup({
        title: "Avatar",
        description: "Are you sure you want to remove the current avatar? The photo cannot be recovered.",
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

  const highlight = {}

  highlight.new = {}
  highlight.new.coverWasChanged = newHighlight.cover !== initialState.newHighlight.cover

  highlight.add = () => {
    const id = !user.highlights.length ? 1 : Math.max(...user.highlights.map(highlight => highlight.id)) + 1

    setUser(prev => ({
      ...prev,
      highlights: [{ id, ...newHighlight }, ...prev.highlights]
    }))

    setNewHighlight(initialState.newHighlight)

    openBasicPopup({
      title: "Success",
      description: "New highlight added."
    })
  }

  const updateHighlight = (e, updateState) => {
    const { name } = e.target

    if (name === "cover") {
      return readImage(e).then(cover => {
        updateState(prev => ({ ...prev, cover }))
        clearErrors(name)
        setValue(name, cover)
      })
    }

    if (name === "description") {
      return updateState(prev => ({
        ...prev,
        description: e.target.value.trim() !== "" ? e.target.value : initialState.newHighlight.description
      }))
    }
  }

  highlight.new.update = e => updateHighlight(e, setNewHighlight)

  highlight.select = highlight => {
    setSelectedHighlight(highlight)
    openComponentPopup(EditHighlight)
  }
  
  highlight.edit = () => {
    const allHighlightsAndUpdatedOne = user.highlights.map(highlight => {
      return highlight.id === selectedHighlight.id ? selectedHighlight : highlight
    })
    
    setUser(prev => ({
      ...prev,
      highlights: allHighlightsAndUpdatedOne
    }))

    setSelectedHighlight(initialState.currentMedia)
    
    openBasicPopup({
      title: "Success",
      description: "Highlight was updated."
    })
  }
  
  if (selectedHighlight) {
    highlight.selected = selectedHighlight

    highlight.selected.update = e => updateHighlight(e, setSelectedHighlight)

    highlight.delete = () => {
      openBasicPopup({
        title: "Delete highlight",
        description: "Are you sure you want to remove this highlight? This action cannot be undone.",
        ok: () => {
          setUser(prev => ({
            ...prev,
            highlights: prev.highlights.filter(highlight => highlight.id !== selectedHighlight.id)
          }))
  
          setSelectedHighlight(initialState.currentMedia)
  
          openBasicPopup({
            title: "Success",
            description: "Highlight removed."
          })
        }
      })
    }
  }

  const post = {}

  post.refs = postsRef

  post.new = {}
  post.new.imageWasChanged = newPost.image !== initialState.newPost.image

  post.add = () => {
    const id = !user.posts.length ? 1 : Math.max(...user.posts.map(post => post.id)) + 1

    setUser(prev => ({
      ...prev,
      posts: [{ id, ...newPost }, ...prev.posts]
    }))

    setNewPost(initialState.newPost)

    openBasicPopup({
      title: "Success",
      description: "New post added."
    })
  }

  post.new.update = e => {
    const { name } = e.target

    if (name === "image") {
      return readImage(e).then(image => {
        setNewPost(prev => ({ ...prev, image }))
        clearErrors(name)
        setValue(name, image)
      })
    }
  }

  post.select = id => setSelectedPostId(selectedPostId !== id ? id : initialState.currentMedia)

  post.reorder = posts => setUser(prev => ({ ...prev, posts }))

  if (selectedPostId) {
    post.selectedId = selectedPostId

    post.delete = () => {
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
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      removeAvatar,
      updateUser,
      highlight,
      newHighlight,
      post,
      newPost
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
