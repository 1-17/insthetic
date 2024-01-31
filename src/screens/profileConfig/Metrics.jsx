import { useUser } from "../../hooks"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"

const Metrics = () => {
  const { user } = useUser()

  return (
    <Fieldset legend="Metrics">
      <Stack>
        <Field
          name="followers"
          type="number"
          defaultValue={user.followers}
          required
        />
        <Field
          name="following"
          type="number"
          defaultValue={user.following}
          required
        />
      </Stack>
    </Fieldset>
  )
}

export default Metrics
