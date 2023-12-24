import React from "react"
import ReactDOM from "react-dom/client"
import Contexts from "./contexts"
import App from "./components/layout/App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Contexts>
      <App />
    </Contexts>
  </React.StrictMode>,
)
