import { TbMoon } from "react-icons/tb"
import { MdOutlineLightMode } from "react-icons/md"
import { LuPlusSquare } from "react-icons/lu"
import { BsGear } from "react-icons/bs"
import { useComponent, useTheme } from "../../hooks"
import AppBar from "./AppBar"
import Avatar from "../profile/Avatar"

class Buttons {
  buttons = [
    {
      label: "",
      icon: "",
      click: ""
    }
  ]

  constructor() {
    const { lightMode, changeTheme } = useTheme()
    const { profile, changeComponent } = useComponent()

    this.buttons = [
      {
        label: `Switch to ${lightMode ? "dark" : "light"} mode`,
        icon: lightMode ? TbMoon : MdOutlineLightMode,
        click: changeTheme
      },
      {
        label: "Add new media",
        icon: LuPlusSquare,
        click: ""
      },
      {
        label: profile ? "Go to config" : "Go to profile",
        icon: profile ? BsGear : Avatar,
        click: changeComponent
      }
    ]

    return this.buttons
  }
}

const Footer = () => {
  const buttons = new Buttons()
  
  return (
    <AppBar element={"footer"}>
      {buttons.map(b =>
        <button
          key={b.label}
          aria-label={b.label}
          onClick={() => b.click()}
          className="text-2xl sm:text-3xl px-6 py-3 hover:bg-medium hover:bg-opacity-10">
          <b.icon />
        </button>
      )}
    </AppBar>
  )
}

export default Footer
