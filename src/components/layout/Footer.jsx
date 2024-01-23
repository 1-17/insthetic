import AppBar from "./AppBar"
import { FooterButtons } from "../../models"
import Button from "./Button"

const Footer = () => {
  const buttons = new FooterButtons()
  
  return (
    <AppBar element="footer">
      {
        buttons.map((button, i) =>
          <Button
            key={i}
            aria-label={button.label}
            onClick={button.click}
            variant="icon"
            className="text-2xl sm:text-3xl px-6 py-3"
          >
            <button.icon />
          </Button>
        )
      }
    </AppBar>
  )
}

export default Footer
