import { useFormContext } from "react-hook-form"
import { useUser } from "../../hooks"
import { readFile } from "../../utils"
import Form from "../../components/layout/Form"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"
import Button from "../../components/layout/Button"
import Avatar from "../profile/Avatar"

const AddMedia = () => {
  const { register } = useFormContext()
  const { newHighlight, setNewHighlight, addHighlight } = useUser()

  return (
    <Form onSubmit={addHighlight}>
      <Fieldset legend="New highlight">
        <Stack className="items-center my-4 first:*:max-xs:mx-auto">
          <Avatar highlights={{
            image: newHighlight.image,
            description: newHighlight.description
          }} />
          <Stack className="grow flex-col max-w-xs mx-auto">
            <Field
              {...register("image", {
                onChange: e => readFile(e).then(file => setNewHighlight(prev => ({ ...prev, image: file })))
              })}
              label="Add cover photo"
              type="file"
              accept=".jpg, .jpeg, .png"
            />
            <Field
              {...register("description", {
                onChange: e => setNewHighlight(prev => ({ ...prev, description: e.target.value || "Highlights" }))
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

export default AddMedia
