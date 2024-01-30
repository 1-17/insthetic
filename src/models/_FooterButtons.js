import { TbMoon } from "react-icons/tb"
import { MdOutlineLightMode } from "react-icons/md"
import { LuPlusSquare } from "react-icons/lu"
import { BsGear } from "react-icons/bs"
import { useTheme, useComponent } from "../hooks"
import Avatar from "../screens/profile/Avatar"

class _FooterButtons {
  buttons = [
    {
      label: "",
      icon: "",
      click: ""
    }
  ]

  constructor() {
    const { lightMode, changeTheme } = useTheme()
    const { profile, profileConfig, showProfileConfig, showProfile } = useComponent()

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
        label: (profile && "Go to profile config" || profileConfig && "Go to profile"),
        icon: (profile && BsGear || profileConfig && Avatar),
        click: (profile && showProfileConfig || profileConfig && showProfile)
      }
    ]

    return this.buttons
  }
}

export default _FooterButtons
