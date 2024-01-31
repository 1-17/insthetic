import { useUser } from "../../hooks"
import Form from "../../components/layout/Form"
import BasicInfo from "./BasicInfo"
import Metrics from "./Metrics"
import Business from "./Business"
import Stack from "../../components/layout/Stack"
import Button from "../../components/layout/Button"

const ProfileConfig = () => {
  const { setUser, discardChanges } = useUser()
  
  return (
    <Form onSubmit={/*{ state: setUser }*/setUser}>
      <BasicInfo />
      <Metrics />
      <Business />
      <Stack>
        <Button type="submit" />
        <Button type="reset" onClick={discardChanges} className="ml-auto" />
      </Stack>
    </Form>
  )
}

export default ProfileConfig
