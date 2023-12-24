import { createElement, useState } from "react"
import classNames from "classnames"
import Container from "./Container"

const AppBar = ({ element, children }) => {
  const [border, setBorder] = useState()
  window.addEventListener("scroll", () => setBorder(window.scrollY > 0))

  return (
    createElement(
      element,
      {
        className: classNames(
          "bg-inherit border-medium border-opacity-25 sticky",
          {
            "top-0": element === "header",
            "border-b": element === "header" && border,
            "bottom-0 border-t": element === "footer",
          }
        )
      },
      <Container
        element={"nav"}
        className="flex justify-between items-center">
        {children}
      </Container>
    )
  )
}

export default AppBar
