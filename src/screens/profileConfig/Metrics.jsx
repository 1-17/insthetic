import { Controller, useFormContext } from "react-hook-form"
import { useUser } from "../../hooks"
import { regex } from "../../models"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"

const Metrics = () => {
  const { trigger, clearErrors } = useFormContext()
  const { user } = useUser()

  return (
    <Fieldset legend="Metrics">
      <Stack>
        <Controller
          name="followers"
          rules={{
            required: "Followers cannot be empty.",
            min: {
              value: 0,
              message: "Followers cannot have negative numbers."
            },
            pattern: {
              value: regex.numbersOnly,
              message: "Followers must have only numbers."
            }
          }}
          defaultValue={user.followers}
          render={({ field }) => (
            <Field
              {...field}
              onChange={e => field.onChange(Number(e.target.value))}
              onBlur={() => trigger("followers")}
              onFocus={() => clearErrors("followers")}
            />
          )}
        />
        <Controller
          name="following"
          rules={{
            required: "Following cannot be empty.",
            min: {
              value: 0,
              message: "Following cannot have negative numbers."
            },
            max: {
              value: 7500,
              message: "Following number cannot be over 7500."
            },
            pattern: {
              value: regex.numbersOnly,
              message: "Following must have only numbers."
            }
          }}
          defaultValue={user.following}
          render={({ field }) => (
            <Field
              {...field}
              onChange={e => field.onChange(Number(e.target.value))}
              onBlur={() => trigger("following")}
              onFocus={() => clearErrors("following")}
            />
          )}
        />
      </Stack>
    </Fieldset>
  )
}

export default Metrics
