import { TbMoon } from "react-icons/tb"
import { MdOutlineLightMode } from "react-icons/md"
import { LuPlusSquare } from "react-icons/lu"
import { BsGear } from "react-icons/bs"
import { useTheme, useScreen } from "../hooks"
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
    const { profileConfig, addMedia, highlight, showProfile, showProfileConfig, showAddMedia } = useScreen()

    this.buttons = [
      {
        label: `Switch to ${lightMode ? "dark" : "light"} mode`,
        icon: lightMode ? TbMoon : MdOutlineLightMode,
        click: changeTheme
      },
      {
        label: !addMedia ? "Go to add new media" : "Go to profile",
        icon: !addMedia ? LuPlusSquare : Avatar,
        click: !addMedia ? showAddMedia : showProfile
      },
      {
        label: !profileConfig ? "Go to profile config" : "Go to profile",
        icon: !profileConfig ? BsGear : Avatar,
        click: !profileConfig ? showProfileConfig : showProfile
      }
    ]

    if (highlight) {
      this.buttons.splice(1, 0, {
        label: "Go to profile",
        icon: Avatar,
        click: showProfile
      })
    }

    return this.buttons
  }
}

export default _FooterButtons
