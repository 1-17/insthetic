import { useComponent } from "../hooks"
import Profile from "./profile"
import ProfileConfig from "./profileConfig"
import AddMedia from "./addMedia"

const Screens = () => {
  const { profile, profileConfig, addMedia } = useComponent()

  return (
    <>
      {profile && <Profile />}
      {profileConfig && <ProfileConfig />}
      {addMedia && <AddMedia />}
    </>
  )
}

export default Screens
