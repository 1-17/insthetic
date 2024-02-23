import { useFormContext } from "react-hook-form"
import { PiArrowLeftBold } from "react-icons/pi"
import { usePopup, useUser } from "../../hooks"
import { AddMedia } from "."
import Form from "../layout/Form"
import Fieldset from "../layout/Fieldset"
import Stack from "../layout/Stack"
import Field from "../layout/Field"
import Button from "../layout/Button"
import Avatar from "../../screens/profile/Avatar"

const _NewHighlight = () => {
  const { register } = useFormContext()
  const { openComponentPopup, closePopup } = usePopup()
  const { highlight, newHighlight } = useUser()

  return (
    <>
      <Button
        aria-label="Go back to Add media"
        onClick={() => openComponentPopup(AddMedia)}
        variant="icon"
        className="rounded-full absolute top-1 left-1 text-2xl p-2"
      >
        <PiArrowLeftBold aria-label="Back" />
      </Button>
      <Form onSubmit={highlight.add}>
        <Fieldset legend="New highlight">
          <Stack fields className="max-sm:flex-col items-center">
            <Avatar highlights={newHighlight} />
            <Stack className="flex-col gap-2 w-full sm:max-w-xs sm:ml-auto">
              <Field
                {...register("cover", {
                  required: "Highlight cover is required.",
                  onChange: highlight.new.update
                })}
                label={(!highlight.new.coverWasChanged ? "Add" : "Change") + " cover photo"}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
              <Field
                {...register("description", {
                  onChange: highlight.new.update
                })}
                maxLength={16}
                placeholder="Highlights"
              />
            </Stack>
          </Stack>
        </Fieldset>
        <Stack className="max-xs:flex-col max-xs:w-full gap-2 w-[70%] ml-auto">
          <Button type="submit" />
          <Button onClick={closePopup} full>
            Cancel
          </Button>
        </Stack>
      </Form>
    </>
  )
}

export default _NewHighlight
