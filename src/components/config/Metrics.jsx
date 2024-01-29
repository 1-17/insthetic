import { useUser } from "../../hooks"
import Fieldset from "../layout/Fieldset"
import Stack from "../layout/Stack"
import Field from "../layout/Field"

const Metrics = () => {
  const { user } = useUser()

  return (
    <Fieldset legend="Metrics">
      <Stack>
        <Field
          name="followers"
          type="number"
          defaultValue={user.followers}
        />
        <Field
          name="following"
          type="number"
          defaultValue={user.following}
        />
      </Stack>
    </Fieldset>
  )
}

export default Metrics
