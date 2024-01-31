import { useEffect, useState } from "react"
/*import { useUser } from "../../hooks"*/
import Form from "../../components/layout/Form"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"
import Button from "../../components/layout/Button"
import Avatar from "../profile/Avatar"

const AddMedia = () => {
  /*const { setUser } = useUser()*/
  const [highlight, setHighlight] = useState({ image: "", description: "Highlights" })

  useEffect(() => {
    const description = document.getElementById("description")
    const updateDescription = e => setHighlight(prev => ({ ...prev, description: e.target.value || "Highlights" }))

    if (description) {
      description.addEventListener("input", updateDescription)
      return () => description.removeEventListener("input", updateDescription)
    }
  }, [])

  return (
    <Form /*onSubmit={{ state: setUser, key: "highlights" }}*/>
      <Fieldset legend="New highlight">
        <Stack className="items-center my-4 first:*:max-xs:mx-auto">
          <Avatar highlights={{
            image: highlight.image,
            description: highlight.description
          }} />
          <Stack className="grow flex-col max-w-xs mx-auto">
            <Field
              label="Add cover photo"
              name="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              file={{
                state: setHighlight
              }}
            />
            <Field
              label="Description"
              name="description"
              placeholder={highlight.description}
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
