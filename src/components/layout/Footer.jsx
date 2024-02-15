import { FooterButtons } from "../../models"
import AppBar from "./AppBar"
import Button from "./Button"

const Footer = () => {
  const buttons = new FooterButtons()
  
  return (
    <AppBar element="footer">
      <ul className="flex justify-between items-center">
        {
          buttons.map((button, i) =>
            <li key={i}>
              <Button
                aria-label={button.label}
                onClick={button.click}
                variant="icon"
                className="text-2xl sm:text-3xl w-20 h-14 *:max-w-fit *:mx-auto"
              >
                <button.icon />
              </Button>
            </li>
          )
        }
      </ul>
    </AppBar>
  )
}

export default Footer
