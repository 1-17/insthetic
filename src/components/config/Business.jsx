import { useUser } from "../../hooks"
import Fieldset from "../layout/Fieldset"
import Field from "../layout/Field"
import { businessLabels, contactOptions } from "../../models"

const Business = () => {
  const { user, setUser } = useUser()

  return (
    <Fieldset legend="Business">
      <Field
        name="label"
        select={{
          defaultValue: user.label,
          options: businessLabels
        }}
      />
      <Field
        label="Contact option"
        name="contact"
        select={{
          defaultValue: user.contact,
          options: contactOptions
        }}
      />
      <Field
        label="Verified badge"
        name="verified"
        type="checkbox"
        checkbox={{
          defaultChecked: user.verified,
          state: setUser
        }}
      />
    </Fieldset>
  )
}

export default Business
