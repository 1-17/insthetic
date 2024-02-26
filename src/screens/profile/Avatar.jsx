import classNames from "classnames"
import { useUser } from "../../hooks"
import { DefaultAvatar } from "../../models"

const Avatar = ({ profile, highlights }) => {
  const { user } = useUser()
  
  return (
    <div>
      <div {...highlights && { className: "w-24 sm:w-28 p-2" }}>
        <div className={classNames(
          "rounded-full min-w-max max-w-fit",
          {
            "bg-gradient-instagram": profile && user.stories,
            "bg-medium-light dark:bg-medium-dark": highlights,
            "p-1.5": profile,
            "block mx-auto p-1": highlights
          }
        )}>
          <div className="relative before:content-[''] before:absolute before:top-0 before:left-0 before:rounded-full before:border before:border-white before:border-opacity-15 before:w-full before:h-full">
            <img
              src={!highlights ? (user.avatar || DefaultAvatar) : highlights.cover}
              alt={!highlights ? `Profile picture of ${user.name}` : highlights.description}
              className={classNames(
                "aspect-square rounded-full object-cover",
                {
                  "bg-light dark:bg-dark": (profile && user.avatar || highlights && highlights.cover),
                  "bg-white": !user.avatar && !highlights,
                  "outline outline-3": profile && user.stories || highlights,
                  "outline-light dark:outline-dark": (profile && user.stories || highlights),
                  "w-20 sm:w-24": profile,
                  "w-16 sm:w-[4.5rem]": highlights,
                  "w-6 sm:w-7": !profile && !highlights
                }
              )}
            />
          </div>
        </div>
        {
          highlights && (
            <span className="block text-center leading-loose text-ellipsis overflow-hidden">
              {highlights.description}
            </span>
          )
        }
      </div>
    </div>
  )
}

export default Avatar
