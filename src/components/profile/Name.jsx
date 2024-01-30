import classNames from "classnames"
import { useUser } from "../../hooks"

const Name = () => {
  const { user } = useUser()

  return (
    user.name && (
      <h2 className={classNames({ "inline": user.pronouns.length > 0 })}>
        {user.name}
      </h2>
    )
  )
}

export default Name
