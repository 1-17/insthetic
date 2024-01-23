import { TbMoon } from "react-icons/tb"
import { MdOutlineLightMode } from "react-icons/md"
import { LuPlusSquare } from "react-icons/lu"
import { BsGear } from "react-icons/bs"
import { useComponent, useTheme } from "../hooks"
import Avatar from "../components/profile/Avatar"

class FooterButtons {
  buttons = [
    {
      label: "",
      icon: "",
      click: ""
    }
  ]

  constructor() {
    const { lightMode, changeTheme } = useTheme()
    const { profile, config, changeComponent } = useComponent()

    this.buttons = [
      {
        label: `Switch to ${lightMode ? "dark" : "light"} mode`,
        icon: lightMode ? TbMoon : MdOutlineLightMode,
        click: changeTheme
      },
      {
        label: "Add new media",
        icon: LuPlusSquare,
        click: () => console.log("clicked")
      },
      {
        label: (profile && "Go to config" || config && "Go to profile"),
        icon: (profile && BsGear || config && Avatar),
        click: changeComponent
      }
    ]

    return this.buttons
  }
}

export default FooterButtons
