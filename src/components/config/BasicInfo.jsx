import { useUser } from "../../hooks"
import Fieldset from "../layout/Fieldset"
import Stack from "../layout/Stack"
import Avatar from "../profile/Avatar"
import Button from "../layout/Button"
import Field from "../layout/Field"

const BasicInfo = () => {
  const { user } = useUser()

  return (
    <Fieldset legend="Basic info">
      <Stack className="my-4 first:*:max-xs:mx-auto">
        <Avatar profile />
        <Stack className="grow flex-col max-w-xs mx-auto">
          <Button type="button" variant="gradient" className="relative">
            <input type="file" className="absolute left-0 w-full opacity-0" />
            Add photo
          </Button>
          <Button>
            Remove photo
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <Field
          name="username"
          defaultValue={user.username}
          required
          maxLength={30}
          copy
        />
        <Field
          name="name"
          defaultValue={user.name}
          maxLength={150}
          copy
        />
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
      <Field
        name="threads"
        defaultValue={user.threads}
        maxLength={30}
        copy
      />
      <Field
        name="bio"
        defaultValue={user.bio}
        maxLength={150}
        textarea
        copy
      />
      <Field
        type="url"
        name="link"
        defaultValue={user.link}
        copy
      />
    </Fieldset>
  )
}

export default BasicInfo
