import classNames from "classnames"
import { useTheme, useUser } from "../../hooks"
import DefaultAvatar from "../../assets/images/default-avatar.svg"

const Avatar = ({ profile, highlights }) => {
  const { lightMode } = useTheme()
  const { user } = useUser()
  
  return (
    <>
      <div className={classNames(
        "rounded-full min-w-max h-fit",
        {
          "bg-gradient-instagram": profile && user.stories,
          "bg-medium-light": lightMode && highlights,
          "bg-medium-dark": !lightMode && highlights,
          "p-1.5": profile,
          "p-1": highlights
        }
      )}>
        <img
          src={!highlights ? (user.avatar || DefaultAvatar) : highlights.image}
          alt={!highlights ? `Profile picture of ${user.name}` : highlights.description}
          className={classNames(
            "aspect-square rounded-full object-cover",
            {
              "bg-light": lightMode && (profile && user.avatar || highlights && highlights.image),
              "bg-dark": !lightMode && (profile && user.avatar || highlights && highlights.image),
              "bg-white": !user.avatar && !highlights,
              "outline outline-3": profile && user.stories || highlights,
              "outline-light": lightMode && (profile && user.stories || highlights),
              "outline-dark": !lightMode && (profile && user.stories || highlights),
              "w-16 sm:w-20": profile,
              "w-14 sm:w-16": highlights,
              "w-6 sm:w-7": !profile && !highlights,
            }
          )}
        />
      </div>
      {
        highlights && (
          <span className="block text-center leading-loose">
            {highlights.description}
          </span>
        )
      }
    </>
  )
}

export default Avatar
