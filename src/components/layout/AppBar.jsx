import { createElement, useState } from "react"
import classNames from "classnames"
import { useComponent } from "../../hooks"
import Container from "./Container"

const AppBar = ({ element, children }) => {
  const { profile } = useComponent()

  const [border, setBorder] = useState()
  window.addEventListener("scroll", () => setBorder(window.scrollY > 0))

  return (
    createElement(
      element,
      {
        className: classNames(
          "bg-inherit border-medium border-opacity-25 sticky z-10",
          {
            "top-0 text-xl sm:text-2xl font-semibold": element === "header",
            "border-b": element === "header" && border,
            "bottom-0 border-t": element === "footer",
          }
        )
      },
      <Container element={element === "footer" && "nav"} className={classNames(
        {
          "p-3": element === "header" && profile,
          "flex justify-between items-center": element === "footer"
        }
      )}>
        {children}
      </Container>
    )
  )
}

export default AppBar
