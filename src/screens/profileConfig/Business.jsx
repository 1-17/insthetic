import { Controller, useFormContext } from "react-hook-form"
import { useUser } from "../../hooks"
import { businessLabels, contactOptions } from "../../models"
import Fieldset from "../../components/layout/Fieldset"
import Field from "../../components/layout/Field"

const Business = () => {
  const { register } = useFormContext()
  const { user, setUser } = useUser()

  return (
    <Fieldset legend="Business">
      <Controller
        name="label"
        defaultValue={user.label}
        render={({ field }) => (
          <Field
            {...field}
            select={{
              options: businessLabels
            }}
          />
        )}
      />
      <Controller
        name="contact"
        defaultValue={user.contact}
        render={({ field }) => (
          <Field
            {...field}
            select={{
              options: contactOptions
            }}
          />
        )}
      />
      <Field
        {...register("verified", {
          onChange: e => setUser(prev => ({ ...prev, verified: e.target.checked }))
        })}
        label="Verified badge"
        type="checkbox"
        defaultChecked={user.verified}
      />
    </Fieldset>
  )
}

export default Business
