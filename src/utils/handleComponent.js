import { useState } from "react"

const handleComponent = () => {
  const [profile, setProfile] = useState(true)
  const [config, setConfig] = useState(false)

  const changeComponent = () => {
    setProfile(prev => !prev)
    setConfig(prev => !prev)
  }

  return { profile, config, changeComponent }
}

export default handleComponent
