import { useUser } from "../../hooks"
import Form from "../../components/layout/Form"
import Stack from "../../components/layout/Stack"
import Button from "../../components/layout/Button"
import BasicInfo from "./BasicInfo"
import Metrics from "./Metrics"
import Business from "./Business"

const _ProfileConfig = () => {
  const { updateUser } = useUser()
  
  return (
    <Form onSubmit={updateUser}>
      <BasicInfo />
      <Metrics />
      <Business />
      <Stack submit>
        <Button type="submit" />
        <Button type="reset" />
      </Stack>
    </Form>
  )
}

export default _ProfileConfig
