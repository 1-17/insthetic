import { useUser } from "../../hooks"
import Form from "../layout/Form"
import BasicInfo from "./BasicInfo"
import Button from "../layout/Button"

const Config = () => {
  const { setUser } = useUser()
  
  return (
    <Form onSubmit={setUser}>
      <BasicInfo />
      <Button type="submit" />
    </Form>
  )
}

export default Config
