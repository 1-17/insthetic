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
  const { selectedHighlight, updateHighlightCover, updateHighlightDescription, editHighlight, deleteHighlight } = useUser()

  return (
    <Form onSubmit={editHighlight}>
      <Fieldset>
        <Stack fields className="max-sm:flex-col items-center">
          <Avatar highlights={{
            cover: selectedHighlight.cover,
            description: selectedHighlight.description
          }} />
          <Stack className="grow flex-col gap-2 w-full">
            <Field
              {...register("cover", {
                onChange: updateHighlightCover
              })}
              label="Change cover photo"
              type="file"
              accept=".jpg, .jpeg, .png"
            />
            <Controller
              name="description"
              defaultValue={selectedHighlight.description}
              render={({ field }) => (
                <Field
                  {...field}
                  maxLength={16}
                  onChange={e => field.onChange(e.target.value)}
                  onInput={updateHighlightDescription}
                />
              )}
            />
          </Stack>
        </Stack>
      </Fieldset>
      <Stack className="max-xs:flex-col justify-between gap-2">
        <Button
          onClick={deleteHighlight}
          variant="danger"
        >
          Delete
        </Button>
        <Stack className="max-xs:flex-col max-xs:w-full gap-2 w-1/2">
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
