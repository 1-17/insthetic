import { useScreen } from "../hooks"
import Profile from "./profile"
import ProfileConfig from "./profileConfig"
import AddMedia from "./addMedia"
import Highlight from "./highlight"

const Screens = () => {
  const { profile, profileConfig, addMedia, highlight } = useScreen()

  return (
    <>
      {
        profile && <Profile /> ||
        profileConfig && <ProfileConfig /> ||
        addMedia && <AddMedia /> ||
        highlight && <Highlight />
      }
    </>
  )
}

export default Screens
