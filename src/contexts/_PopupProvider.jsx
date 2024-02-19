import { useState, useEffect } from "react"
import { PopupContext } from "."

const _PopupProvider = ({ children }) => {
  const initialPopup = null
  const [popup, setPopup] = useState(initialPopup)

  const isOpen = popup !== initialPopup

  useEffect(() => {
    const root = document.getElementById("root")
    isOpen ? root.classList.add("blur-sm") : root.classList.remove("blur-sm")
  }, [popup])
  
  const openBasicPopup = ({ title, description, ok, cancel }) => setPopup({ title, description, ok, cancel })
  const openScreenPopup = screen => setPopup(screen)
  const closePopup = () => setPopup(initialPopup)

  return (
    <PopupContext.Provider value={{ isOpen, popup, openBasicPopup, openScreenPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export default _PopupProvider
