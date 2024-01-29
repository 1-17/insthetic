import { useUser } from "../../hooks"
import Form from "../layout/Form"
import BasicInfo from "./BasicInfo"
import Metrics from "./Metrics"
import Business from "./Business"
import Button from "../layout/Button"
import Stack from "../layout/Stack"

const Config = () => {
  const { setUser } = useUser()
  
  return (
    <Form onSubmit={setUser}>
      <BasicInfo />
      <Metrics />
      <Business />
      <Stack>
        <Button type="submit" />
        <Button type="reset" className="ml-auto" onClick={() => setUser(prev => prev)} />
      </Stack>
    </Form>
  )
}

export default Config
