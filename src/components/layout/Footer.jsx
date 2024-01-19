import AppBar from "./AppBar"
import FooterButtons from "../../models/FooterButtons"

const Footer = () => {
  const buttons = new FooterButtons()
  
  return (
    <AppBar element="footer">
      {
        buttons.map((button, i) =>
          <button
            key={i}
            aria-label={button.label}
            onClick={() => button.click()}
            className="text-2xl sm:text-3xl px-6 py-3 hover:bg-medium hover:bg-opacity-10"
          >
            <button.icon />
          </button>
        )
      }
    </AppBar>
  )
}

export default Footer
