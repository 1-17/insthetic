import { useFormContext } from "react-hook-form"
import { useUser } from "../../hooks"
import { readImage } from "../../utils"
import Form from "../../components/layout/Form"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"
import Button from "../../components/layout/Button"
import Avatar from "../profile/Avatar"

const NewHighlight = () => {
  const { register, setValue, clearErrors } = useFormContext()
  const { newHighlight, setNewHighlight, addHighlight } = useUser()

  return (
    <Form onSubmit={addHighlight}>
      <Fieldset legend="New highlight">
        <Stack fields className="items-center">
          <Avatar highlights={{
            cover: newHighlight.cover,
            description: newHighlight.description
          }} />
          <Stack className="grow flex-col gap-2 max-w-xs mx-auto">
            <Field
              {...register("cover", {
                required: "Highlight cover is required.",
                onChange: e => {
                  readImage(e).then(file => {
                    setNewHighlight(prev => ({ ...prev, cover: file }))
                    clearErrors("cover")
                    setValue("cover", file)
                  })
                }
              })}
              label="Add cover photo"
              type="file"
              accept=".jpg, .jpeg, .png"
            />
            <Field
              {...register("description", {
                onChange: e => setNewHighlight(prev => ({
                  ...prev,
                  description: e.target.value.trim() !== "" ? e.target.value : "Highlights"
                }))
              })}
              maxLength={16}
              placeholder="Highlights"
            />
          </Stack>
        </Stack>
      </Fieldset>
      <Button type="submit" />
    </Form>
  )
}

export default NewHighlight
