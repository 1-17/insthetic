import { useScreen } from "../hooks"

const Screens = () => {
  const { ScreenComponent } = useScreen()

  return (
    <ScreenComponent />
  )
}

export default Screens
export { default as Profile } from "./profile"
export { default as ProfileConfig } from "./profileConfig"
