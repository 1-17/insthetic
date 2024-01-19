import { useForm, useUser } from "../../hooks"
import Fieldset from "../layout/Fieldset"
import Stack from "../layout/Stack"
import Avatar from "../profile/Avatar"
import Button from "../layout/Button"
import Field from "../layout/Field"

const BasicInfo = () => {
  const { user } = useUser()
  const { handleValidations } = useForm()

  return (
    <Fieldset legend="Basic info">
      <Stack className="my-4">
        <Avatar profile />
        <Stack className="grow flex-col max-w-xs mx-auto">
          <Button className="relative" main>
            <input type="file" className="absolute left-0 w-full opacity-0" />
            Add photo
          </Button>
          <Button>
            Remove photo
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <Field type="text" name="username" defaultValue={user.username} required onBlur={handleValidations} copy />
        <Field type="text" name="name" defaultValue={user.name} onBlur={handleValidations} copy />
      </Stack>
      {/* <Field element="select" name="pronouns">
        {
          ["he", "she", "they", "it"].map((pronoun, i) =>
            <option key={i} value={pronoun}>
              {pronoun}
            </option>
          )
        }
      </Field> */}
      <Field type="text" name="threads" defaultValue={user.threads} onBlur={handleValidations} />
      <Field element="textarea" name="bio" defaultValue={user.bio} onBlur={handleValidations} copy />
      <Field type="url" name="link" defaultValue={user.link} onBlur={handleValidations} copy />
    </Fieldset>
  )
}

export default BasicInfo
