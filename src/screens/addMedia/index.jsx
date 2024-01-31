import { useEffect } from "react"
import { useUser } from "../../hooks"
import Form from "../../components/layout/Form"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"
import Button from "../../components/layout/Button"
import Avatar from "../profile/Avatar"

const AddMedia = () => {
  const { newHighlight, setNewHighlight, addHighlight } = useUser()

  useEffect(() => {
    const highlightDescription = document.getElementById("description")
    const updateHighlightDescription = e => setNewHighlight(prev => ({ ...prev, description: e.target.value || "Highlights" }))

    if (highlightDescription) {
      highlightDescription.addEventListener("input", updateHighlightDescription)
      return () => highlightDescription.removeEventListener("input", updateHighlightDescription)
    }
  }, [])

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
              label="Add cover photo"
              name="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              file={{
                state: setNewHighlight
              }}
            />
            <Field
              label="Description"
              name="description"
              placeholder={newHighlight.description}
              maxLength={16}
            />
          </Stack>
        </Stack>
      </Fieldset>
      <Button type="submit" />
    </Form>
  )
}

export default AddMedia
