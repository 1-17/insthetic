import { useState, useEffect, isValidElement } from "react"
import { PopupContext } from "."

const _PopupProvider = ({ children }) => {
  const initialPopup = null
  const [popup, setPopup] = useState(initialPopup)

  const isOpen = popup !== initialPopup
  const isBasicPopup = isOpen && !isValidElement(popup)
  const isComponentPopup = !isBasicPopup

  useEffect(() => {
    const root = document.getElementById("root")

    const classes = "blur-sm"
    isOpen ? root.classList.add(classes) : root.classList.remove(classes)
  }, [popup])
  
  const openBasicPopup = ({ title, description, ok, cancel }) => setPopup({ title, description, ok, cancel })
  const openComponentPopup = Component => setPopup(<Component />)
  const closePopup = () => setPopup(initialPopup)

  return (
    <PopupContext.Provider value={{
      isOpen,
      isBasicPopup,
      isComponentPopup,
      popup,
      openBasicPopup,
      openComponentPopup,
      closePopup
    }}>
      {children}
    </PopupContext.Provider>
  )
}

export default _PopupProvider
