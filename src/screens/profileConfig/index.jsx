import { useUser } from "../../hooks"
import Form from "../../components/layout/Form"
import Stack from "../../components/layout/Stack"
import Button from "../../components/layout/Button"
import BasicInfo from "./BasicInfo"
import Metrics from "./Metrics"
import Business from "./Business"

const ProfileConfig = () => {
  const { updateUser } = useUser()
  
  return (
    <Form onSubmit={updateUser}>
      <BasicInfo />
      <Metrics />
      <Business />
      <Stack>
        <Button type="submit" />
        <Button type="reset" className="ml-auto" />
      </Stack>
    </Form>
  )
}

export default ProfileConfig
