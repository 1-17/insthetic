import { TbBrandThreads } from "react-icons/tb"
import { useUser } from "../../hooks"

const Threads = () => {
  const { user } = useUser()

  return (
    user.threads && (
      <span className="bg-medium bg-opacity-25 rounded-full block px-2 py-0.5 w-fit">
        <TbBrandThreads className="inline align-text-bottom text-lg" />
        {user.threads}
      </span>
    )
  )
}

export default Threads
