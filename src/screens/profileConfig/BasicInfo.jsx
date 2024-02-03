import { Controller, useFormContext } from "react-hook-form"
import { useUser } from "../../hooks"
import { readFile } from "../../utils"
import { pronouns, regex } from "../../models"
import Fieldset from "../../components/layout/Fieldset"
import Stack from "../../components/layout/Stack"
import Field from "../../components/layout/Field"
import Button from "../../components/layout/Button"
import Avatar from "../profile/Avatar"

const BasicInfo = () => {
  const { register, trigger, clearErrors } = useFormContext()
  const { user, setUser, removeAvatar } = useUser()

  return (
    <Fieldset legend="Basic info">
      <Stack className="items-center my-4 first:*:max-xs:mx-auto">
        <Avatar profile />
        <Stack className="grow flex-col max-w-xs mx-auto">
          <Field
            {...register("avatar", {
              onChange: e => readFile(e).then(file => setUser(prev => ({ ...prev, avatar: file })))
            })}
            label="Add photo"
            type="file"
            accept=".jpg, .jpeg, .png"
          />
          <Button onClick={removeAvatar}>
            Remove photo
          </Button>
        </Stack>
      </Stack>
      <Field
        {...register("stories", {
          onChange: e => setUser(prev => ({ ...prev, stories: e.target.checked }))
        })}
        type="checkbox"
        defaultChecked={user.stories}
      />
      <Stack>
        <Controller
          name="username"
          rules={{
            required: "Username cannot be empty.",
            pattern: {
              value: regex.username,
              message: "Username can only contain letters with no accent, numbers, underscores and dots."
            },
            validate: {
              numbersOnly: value => !regex.numbersOnly.test(value) || "Username cannot have only numbers",
              consecutiveDots: value => !regex.consecutiveDots.test(value) || "Username cannot have consecutive dots.",
              startsWithDot: value => !value.startsWith(".") || "Username cannot start with a dot.",
              endsWithDot: value => !value.endsWith(".") || "Username cannot end with a dot."
            }
          }}
          defaultValue={user.username}
          render={({ field }) => (
            <Field
              {...field}
              maxLength={30}
              onBlur={() => trigger("username")}
              onFocus={() => clearErrors("username")}
              copy
            />
          )}
        />
        <Controller
          name="name"
          defaultValue={user.name}
          render={({ field }) => (
            <Field
              {...field}
              maxLength={150}
              copy
            />
          )}
        />
      </Stack>
      <Controller
        name="pronouns"
        defaultValue={user.pronouns}
        render={({ field }) => (
          <Field
            {...field}
            multiple
            select={{
              options: pronouns,
              maxOptions: 4
            }}
          />
        )}
      />
      <Controller
        name="threads"
        rules={{
          pattern: {
            value: regex.username,
            message: "Threads can only contain letters with no accent, numbers, underscores and dots."
          },
          validate: {
            numbersOnly: value => !regex.numbersOnly.test(value) || "Threads cannot have only numbers",
            consecutiveDots: value => !regex.consecutiveDots.test(value) || "Threads cannot have consecutive dots.",
            startsWithDot: value => !value.startsWith(".") || "Threads cannot start with a dot.",
            endsWithDot: value => !value.endsWith(".") || "Threads cannot end with a dot."
          }
        }}
        defaultValue={user.threads}
        render={({ field }) => (
          <Field
            {...field}
            maxLength={30}
            onBlur={() => trigger("threads")}
            onFocus={() => clearErrors("threads")}
            copy
          />
        )}
      />
      <Controller
        name="bio"
        defaultValue={user.bio}
        render={({ field }) => (
          <Field
            {...field}
            maxLength={150}
            textarea
            copy
          />
        )}
      />
      <Controller
        name="link"
        rules={{
          pattern: {
            value: regex.link,
            message: "Insert a valid URL."
          }
        }}
        defaultValue={user.link}
        render={({ field }) => (
          <Field
            {...field}
            type="url"
            onBlur={() => trigger("link")}
            onFocus={() => clearErrors("link")}
            copy
          />
        )}
      />
      <Field
        {...register("suggestions", {
          onChange: e => setUser(prev => ({ ...prev, suggestions: e.target.checked }))
        })}
        label="Suggestions enabled"
        type="checkbox"
        defaultChecked={user.suggestions}
      />
    </Fieldset>
  )
}

export default BasicInfo
