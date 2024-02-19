import { useFormContext } from "react-hook-form"
import { useUser } from "../../hooks"
import { readImage } from "../../utils"
import Form from "../../components/layout/Form"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"
import Button from "../../components/layout/Button"

const NewPost = () => {
  const { register, setValue, clearErrors } = useFormContext()
  const { newPost, setNewPost, addPost } = useUser()

  return (
    <Form onSubmit={addPost}>
      <Fieldset legend="New post">
        <Stack fields className="items-center">
          <img
            src={newPost.image}
            alt="Post"
            className="aspect-square object-cover w-[100px] sm:w-[120px]"
          />
          <Stack className="w-full max-w-xs mx-auto">
            <Field
              {...register("image", {
                required: "Image is required.",
                onChange: e => {
                  readImage(e).then(file => {
                    setNewPost(prev => ({ ...prev, image: file }))
                    clearErrors("image")
                    setValue("image", file)
                  })
                }
              })}
              label="Add image"
              type="file"
              accept=".jpg, .jpeg, .png"
            />
          </Stack>
        </Stack>
      </Fieldset>
      <Button type="submit" />
    </Form>
  )
}

export default NewPost
