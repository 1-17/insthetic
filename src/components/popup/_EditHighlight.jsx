import { Controller, useFormContext } from "react-hook-form"
import { usePopup, useUser } from "../../hooks"
import Form from "../layout/Form"
import Fieldset from "../layout/Fieldset"
import Stack from "../layout/Stack"
import Field from "../layout/Field"
import Button from "../layout/Button"
import Avatar from "../../screens/profile/Avatar"

const _EditHighlight = () => {
  const { register } = useFormContext()
  const { closePopup } = usePopup()
  const { highlight } = useUser()

  return (
    <Form onSubmit={highlight.edit}>
      <Fieldset legend="Edit highlight">
        <Stack fields className="max-sm:flex-col items-center">
          <Avatar highlights={highlight.selected} />
          <Stack className="flex-col gap-2 w-full sm:max-w-xs sm:ml-auto">
            <Field
              {...register("cover", {
                onChange: highlight.selected.update
              })}
              label="Change cover photo"
              type="file"
              accept=".jpg, .jpeg, .png"
            />
            <Controller
              name="description"
              defaultValue={highlight.selected.description}
              render={({ field }) => (
                <Field
                  {...field}
                  maxLength={16}
                  onChange={e => field.onChange(e.target.value)}
                  onInput={highlight.selected.update}
                />
              )}
            />
          </Stack>
        </Stack>
      </Fieldset>
      <Stack className="max-xs:flex-col justify-between gap-2">
        <Button
          onClick={highlight.delete}
          variant="danger"
        >
          Delete
        </Button>
        <Stack className="max-xs:flex-col max-xs:w-full gap-2 w-[70%]">
          <Button type="submit" />
          <Button onClick={closePopup} full>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  )
}

export default _EditHighlight
