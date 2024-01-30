import { useUser } from "../../hooks"
import { pronouns } from "../../models"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Avatar from "../profile/Avatar"
import Field from "../../components/layout/Field"
import Button from "../../components/layout/Button"

const BasicInfo = () => {
  const { user, setUser, removeAvatar } = useUser()

  return (
    <Fieldset legend="Basic info">
      <Stack className="items-center my-4 first:*:max-xs:mx-auto">
        <Avatar profile />
        <Stack className="grow flex-col max-w-xs mx-auto">
          <Field
            label="Add photo"
            name="avatar"
            type="file"
            accept=".jpg, .jpeg, .png"
            file={{
              state: setUser
            }}
          />
          <Button onClick={removeAvatar}>
            Remove photo
          </Button>
        </Stack>
      </Stack>
      <Field
        name="stories"
        type="checkbox"
        checkbox={{
          defaultChecked: user.stories,
          state: setUser
        }}
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
        checkbox={{
          defaultChecked: user.suggestions,
          state: setUser
        }}
      />
    </Fieldset>
  )
}

export default BasicInfo
