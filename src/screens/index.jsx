import { useScreen } from "../hooks"
import Profile from "./profile"
import ProfileConfig from "./profileConfig"
import AddMedia from "./addMedia"

const Screens = () => {
  const { profile, profileConfig, addMedia } = useScreen()

  return (
    <>
      {
        profile && <Profile /> ||
        profileConfig && <ProfileConfig /> ||
        addMedia && <AddMedia />
      }
    </>
  )
}

export default Screens
