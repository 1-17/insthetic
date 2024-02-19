import { Controller, useFormContext } from "react-hook-form"
import { useUser } from "../../hooks"
import { readImage } from "../../utils"
import Form from "../../components/layout/Form"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"
import Button from "../../components/layout/Button"
import Avatar from "../profile/Avatar"

const _Highlight = () => {
  const { register } = useFormContext()
  const { currentHighlight, setCurrentHighlight, editHighlight, deleteHighlight } = useUser()

  return (
    <Form onSubmit={editHighlight}>
      <Fieldset>
        <Stack fields className="items-center">
          <Avatar highlights={{
            cover: currentHighlight.cover,
            description: currentHighlight.description
          }} />
          <Stack className="grow flex-col gap-2 max-w-xs mx-auto">
            <Field
              {...register("cover", {
                onChange: e => {
                  readImage(e).then(file => {
                    setCurrentHighlight(prev => ({ ...prev, cover: file }))
                  })
                }
              })}
              label="Change cover photo"
              type="file"
              accept=".jpg, .jpeg, .png"
            />
            <Controller
              name="description"
              defaultValue={currentHighlight.description}
              render={({ field }) => (
                <Field
                  {...field}
                  maxLength={16}
                  onChange={e => field.onChange(e.target.value)}
                  onInput={e => setCurrentHighlight(prev => ({
                    ...prev,
                    description: e.target.value.trim() !== "" ? e.target.value : "Highlights"
                  }))}
                />
              )}
            />
          </Stack>
        </Stack>
      </Fieldset>
      <Stack submit>
        <Button type="submit" />
        <Button
          onClick={deleteHighlight}
          variant="danger"
          className="max-xs:w-full w-1/4"
          >
          Delete
        </Button>
      </Stack>
    </Form>
  )
}

export default _Highlight
