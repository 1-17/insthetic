import { useUser } from "../../hooks"
import Fieldset from "../layout/Fieldset"
import Stack from "../layout/Stack"
import Avatar from "../profile/Avatar"
import Button from "../layout/Button"
import Field from "../layout/Field"
import { pronouns } from "../../models"

const BasicInfo = () => {
  const { user } = useUser()

  return (
    <Fieldset legend="Basic info">
      <Stack className="my-4 first:*:max-xs:mx-auto">
        <Avatar profile />
        <Stack className="grow flex-col max-w-xs mx-auto">
          <Button variant="gradient" className="relative">
            <input type="file" className="absolute left-0 w-full opacity-0" />
            Add photo
          </Button>
          <Button>
            Remove photo
          </Button>
        </Stack>
      </Stack>
      <Field
        name="stories"
        type="checkbox"
        checkbox={user.stories}
      />
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
      <Field
        name="pronouns"
        select={{
          defaultValue: user.pronouns,
          options: pronouns,
          multiple: true,
          maxOptions: 4
        }}
      />
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
      <Field
        label="Suggestions enabled"
        name="suggestions"
        type="checkbox"
        checkbox={user.suggestions}
      />
    </Fieldset>
  )
}

export default BasicInfo
