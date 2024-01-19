import { useUser } from "../../hooks"
import Form from "../layout/Form"
import BasicInfo from "./BasicInfo"
import Button from "../layout/Button"

const Config = () => {
  const { updateUser } = useUser()

  return (
    <Form onSubmit={updateUser}>
      <BasicInfo />
      <Button type="submit" main>
        Submit
      </Button>
    </Form>
  )
}

export default Config
