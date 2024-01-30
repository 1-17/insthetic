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
