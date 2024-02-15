import React from "react"
import ReactDOM from "react-dom/client"
import Contexts from "./contexts"
import App from "./components/layout/App"
import "./assets/styles/main.css"

const root = document.getElementById("root")

root.setAttribute("class", "bg-inherit flex flex-col max-sm:text-sm min-h-screen transition-colors")

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Contexts>
      <App />
    </Contexts>
  </React.StrictMode>,
)
