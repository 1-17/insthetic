import { useFormContext } from "react-hook-form"
import { PiArrowLeftBold } from "react-icons/pi"
import { usePopup, useUser } from "../../hooks"
import { AddMedia } from "."
import Form from "../layout/Form"
import Fieldset from "../layout/Fieldset"
import Stack from "../layout/Stack"
import Field from "../layout/Field"
import Button from "../layout/Button"

const _NewPost = () => {
  const { register } = useFormContext()
  const { openComponentPopup, closePopup } = usePopup()
  const { post, newPost } = useUser()

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
      <Form onSubmit={post.add}>
        <Fieldset legend="New post">
          <Stack fields className="flex-col items-center">
            <img
              src={newPost.image}
              alt="Post"
              className="border border-medium border-opacity-25 aspect-square object-cover w-36 sm:w-40"
            />
            <Stack className="w-full max-w-screen-xs mx-auto">
              <Field
                {...register("image", {
                  required: "Image is required.",
                  onChange: post.new.update
                })}
                label={(!post.new.imageWasChanged ? "Add" : "Change") + " image"}
                type="file"
                accept=".jpg, .jpeg, .png"
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

export default _NewPost
