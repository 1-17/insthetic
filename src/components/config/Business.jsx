import { useUser } from "../../hooks"
import Fieldset from "../layout/Fieldset"
import Field from "../layout/Field"
import { businessLabels, contactOptions } from "../../models"

const Business = () => {
  const { user } = useUser()

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
        name="verified"
        type="checkbox"
        checkbox={user.verified}
      />
    </Fieldset>
  )
}

export default Business
