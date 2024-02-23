import { TbMoon } from "react-icons/tb"
import { MdOutlineLightMode } from "react-icons/md"
import { LuPlusSquare } from "react-icons/lu"
import { BsGear } from "react-icons/bs"
import { useTheme, useScreen, usePopup } from "../hooks"
import Buttons from "./_Buttons"
import Avatar from "../screens/profile/Avatar"
import { AddMedia } from "../components/popup"

class _FooterButtons extends Buttons {
  constructor() {
    super()

    const { lightMode, changeTheme } = useTheme()
    const { profileConfig, showProfile, showProfileConfig } = useScreen()
    const { openComponentPopup } = usePopup()

    this.buttons = [
      {
        label: `Switch to ${lightMode ? "dark" : "light"} mode`,
        icon: lightMode ? TbMoon : MdOutlineLightMode,
        click: changeTheme
      },
      {
        label: "Add media",
        icon: LuPlusSquare,
        click: () => openComponentPopup(AddMedia)
      },
      {
        label: !profileConfig ? "Go to profile config" : "Go to profile",
        icon: !profileConfig ? BsGear : Avatar,
        click: !profileConfig ? showProfileConfig : showProfile
      }
    ]

    return this.buttons
  }
}

export default _FooterButtons
