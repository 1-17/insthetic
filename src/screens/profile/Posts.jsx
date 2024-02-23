import { IoMdGrid } from "react-icons/io"
import { LuTrash } from "react-icons/lu"
import classNames from "classnames"
import { useUser } from "../../hooks"
import { dragAndDrop } from "../../utils"

const Posts = () => {
  const { user, post: postMethods } = useUser()
  
  return (
    user.posts.length > 0 && (
      <section>
        <span className="border-b border-medium border-opacity-25 block text-2xl sm:text-3xl py-2">
          <IoMdGrid aria-label="Posts" className="mx-auto" />
        </span>
        <nav>
          <ul className="grid grid-cols-3 gap-1 mt-1">
            {
              user.posts.map(post =>
                <li
                  key={post.id}
                  {...dragAndDrop({
                    items: user.posts,
                    itemId: post.id,
                    update: postMethods.reorder
                  })}
                  onClick={() => postMethods.select(post.id)}
                  className={classNames(
                    "cursor-pointer",
                    {
                      "relative": postMethods.selectedId === post.id
                    }
                  )}
                >
                  {
                    (postMethods.selectedId === post.id) && (
                      <div className="bg-medium bg-opacity-25 absolute top-0 left-0 grid place-items-center w-full h-full z-10">
                        <button
                          aria-label="Delete post"
                          onClick={postMethods.delete}
                          className="bg-medium bg-opacity-50 border-2 rounded-full text-white text-[6vw] sm:text-4xl p-[3vw] sm:p-4"
                          >
                          <LuTrash aria-label="Delete" />
                        </button>
                      </div>
                    )
                  }
                  <img
                    src={post.image}
                    alt="Post"
                    className="aspect-square object-cover w-full"
                  />
                </li>
              )
            }
          </ul>
        </nav>
      </section>
    )
  )
}

export default Posts
