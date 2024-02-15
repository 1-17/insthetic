import { createElement, useEffect, useState } from "react"
import classNames from "classnames"
import { useScreen } from "../../hooks"
import Container from "./Container"

const AppBar = ({ element, children }) => {
  const { profile } = useScreen()

  const [border, setBorder] = useState()

  useEffect(() => {
    const handleBorder = () => setBorder(window.scrollY > 0)

    window.addEventListener("scroll", handleBorder)
    return () => window.removeEventListener("scroll", handleBorder)
  }, [])

  return (
    createElement(
      element,
      {
        className: classNames(
          "bg-inherit border-medium border-opacity-25 sticky z-50",
          {
            "top-0 text-xl sm:text-2xl font-semibold": element === "header",
            "border-b": element === "header" && border,
            "bottom-0 border-t": element === "footer",
          }
        )
      },
      <Container
        {...(element === "header" && profile) && { className: "py-3" }}
        {...element === "footer" && { element: "nav" }}
      >
        {children}
      </Container>
    )
  )
}

export default AppBar
